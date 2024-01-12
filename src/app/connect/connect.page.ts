import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat/chat.service';
import { Observable, map, of, switchMap } from 'rxjs';
import { IonContent, NavController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Auth, UserCredential, signInWithCredential,  } from '@angular/fire/auth';
import { ConnectionConnectionService } from '../services/connection/connection-connection.service';
import { AlertController, LoadingController, isPlatform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.page.html',
  styleUrls: ['./connect.page.scss'],
})
export class ConnectPage implements OnInit {

  id!: any;
  name!: string;
  email: any;
  company: any;
  telephone: any;
  users!: Observable<any[]>;
  connectid: any;
  connect_name: any;
  connect_email: any;
  connections: any;
  connectionStatus: any;
  connectionVal: any;
  status: any;
  gmailid: any;
  roomId: any;
  
  constructor(private api: ApiService, private loadingController: LoadingController, public http: HttpClient, private storage: Storage,private router: Router, private chatService: ChatService, private route: ActivatedRoute, 
    private navCtrl: NavController, private auth: Auth, private connectionService: ConnectionConnectionService) {}

  async ngOnInit() {
    const data: any = this.router.getCurrentNavigation()?.extras.state;
    console.log('data', data);
      if (data?.email) {
        this.name = data.name;
        this.email = data.email;
        this.status = data.status;
      } else {
        this.navCtrl.back();
        return;
      }
      const id = data?.id;
      if (!id) {
        this.navCtrl.back();
        return;
      }
      this.id = id;
      this.gmailid = await this.storage.get('gmailid');

    if(this.gmailid) {
      this.getConnectedUsersForGoogle();
      console.log("connnectionVerificationStatus", this.gmailid, this.id);
      this.http
        .post('https://casa.evokemusic.net/api/v1/connection_status', {
          user_id: this.gmailid,
          connection_id: this.id
        })
        .subscribe((response) => {
          this.connectionStatus = response;
          if(this.connectionStatus.status == "connected") {
            this.connectionVal = 1;
          }
          else {
            this.connectionVal = 0;
          }
          console.log('Connection Status', response);
        },(error:any) => {
          console.log("Error", error);
        });
    }
    else {
      this.getConnectedUsers();
      console.log("connnectionVerificationStatus", this.auth.currentUser?.uid, this.id);
      this.http
        .post('https://casa.evokemusic.net/api/v1/connection_status', {
          user_id: this.auth.currentUser?.uid,
          connection_id: this.id
        })
        .subscribe((response) => {
          this.connectionStatus = response;
          if(this.connectionStatus.status == "connected") {
            this.connectionVal = 1;
          }
          else {
            this.connectionVal = 0;
          }
          console.log('Connection Status', response);
        },(error:any) => {
          console.log("Error", error);
        });
    }
  }

  async createConnection() {
    if(this.gmailid) {
      console.log("createConnection",this.gmailid, this.id);
      this.http
        .post('https://casa.evokemusic.net/api/v1/user_connection', {
          user_id: this.gmailid,
          connection_id: this.id
        })
        .subscribe(async (response) => {
          console.log('Users connected', response);
          // const room = this.connectionService.createConnection(this.id);
          let room: any;
          const querySnapshot = await this.api.getDocs(
            'connectedUsers',
            this.api.whereQuery(
              'members',
              'in',
              [[this.id, this.gmailid], [this.gmailid, this.id]]
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
              this.gmailid,
              this.id
            ],
            type: 'private',
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          room = await this.api.addDocument('connectedUsers', data);
          const navData: NavigationExtras = {
            queryParams: {
              name: this.name
            }
          };
          console.log("Connection Creating");
          this.router.navigateByUrl('menu/network');
          return room;
        },(error:any) => {
          console.log("Error", error);
        });
    }
    else {
      console.log("createConnection",this.auth.currentUser?.uid, this.id);
      this.http
        .post('https://casa.evokemusic.net/api/v1/user_connection', {
          user_id: this.auth.currentUser?.uid,
          connection_id: this.id
        })
        .subscribe((response) => {
          console.log('Users connected', response);
          const room = this.connectionService.createConnection(this.id);
          console.log('Room: ',room);
          const navData: NavigationExtras = {
            queryParams: {
              name: this.name
            }
          };
          console.log("Connection Creating");
          this.router.navigateByUrl('menu/network');
        },(error:any) => {
          console.log("Error", error);
        });
    } 
  }

  // newConnection() {
  //   if(!this.users) this.getUsers();
  // }

  // getUsers() {
  //   this.connectionService.getUsers();
  //   this.users = this.connectionService.users;
  // }

  // getUserForGoogle() {
  //   this.users = this.api.collectionDataQuery(
  //     'users',
  //     this.api.whereQuery('uid', '!=', this.gmailid)
  //   );
  //   console.log('getUserForGoogle :', this.users);
  // }

  getConnectedUsers() {
    this.connectionService.getConnections();
    this.connections = this.connectionService.connections;
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

  // getUser(user: any) {
  //   return user;
  // }

  async startChat() {
    if(this.gmailid) { 
      let room: any;
      // Fetch chat rooms where the current user and another user are members
      const querySnapshot = await this.api.getDocs(
        'chatRooms',
        this.api.whereQuery(
          'members',
          'in',
          [[this.id, this.gmailid], [this.gmailid, this.id]]
        )
      );

      // Check if any existing rooms are found
      if (querySnapshot.docs.length > 0) {
        // If existing rooms are found, use the first one
        const existingRoom = querySnapshot.docs[0];
        room = { id: existingRoom.id, ...existingRoom.data() };
      } else {
        // If no existing rooms, create a new one
        const data = {
          members: [this.gmailid, this.id],
          type: 'private',
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const createdRoomRef = await this.api.addDocument('chatRooms', data);
      }

      // Navigation to the created or existing room
      const navData: NavigationExtras = {
        queryParams: {
          name: this.name,
        },
      };

      // Navigate to the chat room and log its ID
      this.router.navigate(['/', 'connect', 'chats', room.id], navData);
      console.log("room.id :", room.id);
    }
    else {
      const room = await this.chatService.createChatRoom(this.id);
      const navData: NavigationExtras = {
        queryParams: {
          name: this.name
        }
      };
      this.router.navigate(['/', 'connect', 'chats', room?.id], navData);
    }
  }

}