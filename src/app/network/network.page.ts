import { Component, OnInit } from '@angular/core';
//import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ChatService } from '../services/chat/chat.service';
import { Observable, map, of, switchMap } from 'rxjs';
import { signInWithPopup, OAuthProvider, User } from 'firebase/auth';
import { AlertController, LoadingController, isPlatform } from '@ionic/angular';
//import { Http } from '@capacitor-community/http';
import { Storage } from '@ionic/storage-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Auth, UserCredential, signInWithCredential } from '@angular/fire/auth';
import { ConnectionConnectionService } from '../services/connection/connection-connection.service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.page.html',
  styleUrls: ['./network.page.scss'],
})
export class NetworkPage implements OnInit {

  // user: any;
  value: any = "N";
  users!: Observable<any[]>;
  user: User | null = null;
  connectedUsers: any = [];
  connections!: Observable<any[]>;
  gmailid: any;
  appleid: any;

  constructor(private api: ApiService, private auth: Auth, public http: HttpClient, private storage: Storage, private route: ActivatedRoute, private router: Router, private chatService: ChatService, private loadingController: LoadingController, private connectionService: ConnectionConnectionService) {
  }

  async ngOnInit(){
    const loading = await this.loadingController.create();
    await loading.present();
    this.gmailid = await this.storage.get('gmailid');
    this.appleid = await this.storage.get('appleid');
    console.log('gmailid :', this.gmailid);
    if(this.gmailid) {
      this.getUserForGoogle();
      this.getConnectedUsersForGoogle();
    }
    else if(this.appleid) {
      this.getUserForIos();
      this.getConnectedUsersForIos();
    }
    else {
      this.getUsers();
      this.getConnectedUsers();
    }
    await loading.dismiss();
  }

  type(val: any) {
    this.value = val;
  }

  getUsers() {
    this.chatService.getUsers();
    this.users = this.chatService.users;
    console.log("Network->getUsers->users :", this.users);
  }

  getUserForGoogle() {
    this.users = this.api.collectionDataQuery(
      'users',
      this.api.whereQuery('uid', '!=', this.gmailid)
    );
    console.log('getUserForGoogle :', this.users);
  }

  getUserForIos() {
    this.users = this.api.collectionDataQuery(
      'users',
      this.api.whereQuery('uid', '!=', this.appleid)
    );
    console.log('getUserForGoogle :', this.users);
  }

  getUser(user: any) {
    return user;
  }

  async connectUser(item: any) {
    const navData: NavigationExtras = {
      state: {
        id: item.id,
        name: item?.name,
        email: item?.email,
        status: 0
      }
    };
    this.router.navigate(['/connect'], navData); // Change the navigation
    console.log("navData :", navData);
  }

  async connectedUser(item: any) {
    // console.log("Connected User :", item)
    const navData: NavigationExtras = {
      state: {
        id: item.id,
        name: item?.name,
        email: item?.email,
        status: 1
      }
    };
    this.router.navigate(['/connect'], navData); // Change the navigation
  }

  getConnectedUsers() {
    this.connectionService.getConnections();
    this.connections = this.connectionService.connections;
    console.log('getConnectedUsers :', this.connections);
  }

  getConnectedUsersForGoogle() {
    this.connections = this.api.collectionDataQuery(
      'connectedUsers',
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
        console.log('getConnectedUsersForGoogle :', data);
        return (data);
      }),
      switchMap(data => {
        return of(data);
      })
    );
  }

  getConnectedUsersForIos() {
    this.connections = this.api.collectionDataQuery(
      'connectedUsers',
      this.api.whereQuery('members', 'array-contains', this.appleid)
    ).pipe(
      map((data: any[]) => {
        // console.log('Room data: ', data);
        data.map((element) => {
          const user_data = element.members.filter((x: any) => x != this.appleid);
          // console.log(user_data);
          const user = this.api.docDataQuery(`users/${user_data[0]}`, true);
          element.user = user;
        });
        console.log('getConnectedUsersForGoogle :', data);
        return (data);
      }),
      switchMap(data => {
        return of(data);
      })
    );
  }

}
