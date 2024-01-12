import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, PopoverController, isPlatform } from '@ionic/angular';
import { Observable, map, of, switchMap, take } from 'rxjs';
import { ChatService } from '../services/chat/chat.service';
import { signInWithPopup, OAuthProvider, User } from 'firebase/auth';
import { Auth, UserCredential, signInWithCredential,  } from '@angular/fire/auth';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.page.html',
  styleUrls: ['./messaging.page.scss'],
})
export class MessagingPage implements OnInit {
  @ViewChild('new_chat') modal: ModalController;
  @ViewChild('popover') popover: PopoverController; 
  open_new_chat = false;
  users: Observable<any[]>;
  user: User | null = null;
  chatRooms: Observable<any[]>;
  gmailid: any;
  // model = {
  //   icon: 'chatbubbles-outline',
  //   title: 'No Chat Rooms',
  //   color: 'dark'
  // }

  // users: any = [
  //   {id: 1, name: 'Emily', photo: 'https://i.pravatar.cc/385'},
  // ];

  // chatRooms = [
  //   {id: 1, email: 'testmail@gmail.com', photo: 'https://i.pravatar.cc/385'},
  // ]

  constructor(private storage: Storage, private api: ApiService, private auth: Auth, private loadingController: LoadingController, private router: Router, private chatService: ChatService) {
    this.auth.onAuthStateChanged((userState) => {
      this.user = userState;
    });
  }

  async ngOnInit() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.gmailid = await this.storage.get('gmailid');
    console.log("gmailid :", this.gmailid);
    if(this.gmailid) {
      this.getRoomsForGoogle();
    }
    else {
      this.getRooms();
    }
    await loading.dismiss();
  }

  async back() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.router.navigateByUrl('menu/home');
    await loading.dismiss();
  }

  // newChat() {
  //   this.open_new_chat = true;
  //   if(!this.users) this.getUsers();
  // }

  newChat() {
    // this.open_new_chat = true;
    // if(!this.users) this.getUsers();
    this.router.navigateByUrl('menu/network');
  }

  getUsers() {
    this.chatService.getUsers();
    this.users = this.chatService.users;
  }

  getRooms() {
    this.chatService.getChatRooms();
    this.chatRooms = this.chatService.chatRooms;
    console.log('chatRooms: ', this.chatRooms);
  }

  getRoomsForGoogle() {
    this.chatRooms = this.api.collectionDataQuery(
      'chatRooms',
      this.api.whereQuery('members', 'array-contains', this.gmailid)
    ).pipe(
      map((data: any[]) => {
        // console.log('Room data: ', data);
        data.map((element) => {
          const user_data = element.members.filter((x: any) => x != this.gmailid);
          // console.log(user_data);
          const user = this.api.docDataQuery(`users/${user_data[0]}`, true);
          element.user = user;
        });
        console.log('chatRooms :', data);
        return (data);
      }),
      switchMap(data => {
        return of(data);
      })
    );
    
  }

  onWillDismiss(event: any) {}

  cancel() {
    this.modal.dismiss();
    this.open_new_chat = false;
  }

  async startChat(item) {
    try {
      const room = await this.chatService.createChatRoom(item?.uid);
      console.log('Room: ',room);
      this.cancel();
      const navData: NavigationExtras = {
        queryParams: {
          name: item?.name
        }
      };
      this.router.navigate(['/', 'messaging', 'chats', room?.id], navData);
    }
    catch(e) {
      console.log(e);
    }
  }

  getChat(item) {
    (item?.user).pipe(
      take(1)
    ).subscribe(user_data => {
      console.log('data :', user_data);
      const navData: NavigationExtras = {
        queryParams: {
          name: user_data?.name
        }
      };
      this.router.navigate(['/', 'messaging', 'chats', item?.id], navData);
    });
  }

  getUser(user: any) {
    return user;
  }

}
