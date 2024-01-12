import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Auth, UserCredential, signInWithCredential,  } from '@angular/fire/auth';
import { Observable, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionConnectionService {

  public connections!: Observable<any>;
  public connectedusers!: Observable<any>;
  public users!: Observable<any>;
  constructor(private api: ApiService, public au: Auth) { }

  getUsers() {
    this.users = this.api.collectionDataQuery(
      'users',
      this.api.whereQuery('uid', '!=', this.au.currentUser?.uid)
    );
  }

  async createConnection(user_id: any) {
    try {
      let room: any;
      const querySnapshot = await this.api.getDocs(
        'connectedUsers',
        this.api.whereQuery(
          'members',
          'in',
          [[user_id, this.au.currentUser?.uid], [this.au.currentUser?.uid, user_id]]
        )
      );
      // console.log("createChatRoom user_id :", user_id);
      room = await querySnapshot.docs.map((doc: any) => {
        let item = doc.data();
        item.id = doc.id;
        return item;
      });
      // console.log('Exist docs: ', room);
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
      room = await this.api.addDocument('connectedUsers', data);
      return room;
    }
    catch(e) {
      throw(e);
    }
  }

  getConnections() {
    this.connections = this.api.collectionDataQuery(
      'connectedUsers',
      this.api.whereQuery('members', 'array-contains', this.au.currentUser?.uid)
    ).pipe(
      map((data: any[]) => {
        // console.log('Room data: ', data);
        data.map((element) => {
          const user_data = element.members.filter((x: any) => x != this.au.currentUser?.uid);
          // console.log(user_data);
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

}