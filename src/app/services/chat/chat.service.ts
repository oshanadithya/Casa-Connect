import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, map, of, switchMap } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { Auth, UserCredential, signInWithCredential,  } from '@angular/fire/auth';
import {signInWithPopup, OAuthProvider, User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public users!: Observable<any>;
  public chatRooms!: Observable<any>;
  public selectedChatRoomMessages!: Observable<any>;

  currentUserId: any = this.au.currentUser?.uid;
  user: User | null = null;

  constructor(
    public auth: AuthService,
    private api: ApiService,
    public au: Auth
  ) { 
    this.au.onAuthStateChanged((userState) => {
      this.user = userState;
    });
    this.getId();
  }

  async getId() {
    this.currentUserId = this.au.currentUser?.uid;
  }

  getUsers() {
    this.users = this.api.collectionDataQuery(
      'users',
      this.api.whereQuery('uid', '!=', this.au.currentUser?.uid)
    );
    console.log("getUsers :", this.users);
  }

  async createChatRoom(user_id: any) {
    try {
      let room: any;
      const querySnapshot = await this.api.getDocs(
        'chatRooms',
        this.api.whereQuery(
          'members',
          'in',
          [[user_id, this.au.currentUser?.uid], [this.au.currentUser?.uid, user_id]]
        )
      );
      console.log("createChatRoom user_id :", user_id);
      room = await querySnapshot.docs.map((doc: any) => {
        let item = doc.data();
        item.id = doc.id;
        return item;
      });
      console.log('Exist docs: ', room);
      if(room?.length > 0) return room[0];
      const data = {
        members: [
          this.au.currentUser?.uid,
          user_id
        ],
        type: 'private',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      room = await this.api.addDocument('chatRooms', data);
      return room;
    }
    catch(e) {
      throw(e);
    }
  }

  getChatRooms() {
    this.chatRooms = this.api.collectionDataQuery(
      'chatRooms',
      this.api.whereQuery('members', 'array-contains', this.au.currentUser?.uid)
    ).pipe(
      map((data: any[]) => {
        console.log('Room data: ', data);
        data.map((element) => {
          const user_data = element.members.filter((x: any) => x != this.au.currentUser?.uid);
          console.log(user_data);
          const user = this.api.docDataQuery(`users/${user_data[0]}`, true);
          element.user = user;
        });
        return (data);
      }),
      switchMap(data => {
        return of(data);
      })
    );
  }

  getChatRoomsMessages(chatRoomId: any) {
    this.selectedChatRoomMessages = this.api.collectionDataQuery(
      `chats/${chatRoomId}/messages`,
      this.api.orderByQuery('createdAt', 'desc')
    )
    .pipe(map((arr: any) => arr.reverse()));
  }

  async sendMessage(chatId: any, msg: any) {
    try {
      const new_message = {
        message: msg,
        sender: this.au.currentUser?.uid,
        createdAt: new Date()
      };
      console.log(chatId);
      if(chatId) {
        await this.api.addDocument(`chats/${chatId}/messages`, new_message);
      }
    }
    catch(e) {
      throw(e);
    }
  }

}
