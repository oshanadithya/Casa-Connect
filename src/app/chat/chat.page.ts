import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, NavController } from '@ionic/angular';
import { Observable, map } from 'rxjs';
import { ChatService } from '../services/chat/chat.service';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content!: IonContent;
  id!: string;
  name!: string;
  email: any;
  chats!: Observable<any[]>
  message!: string;
  isLoading!: boolean;
  currentUserId = 1;
  gmailid: any;
  appleid: any;
  public selectedChatRoomMessages!: Observable<any>;
  model = {
    icon: 'chatbubble-outline',
    title: 'No Conversation',
    color: 'danger'
  };
  // chats = [
  //   {id: 1, sender: 1, message: 'Hi'},
  //   {id: 2, sender: 2, message: 'Hello, How are you?'},
  // ];

  constructor(
    private route: ActivatedRoute, 
    private navCtrl: NavController,
    public chatService: ChatService,
    private storage: Storage,
    private api: ApiService
    // private global: GlobalService
  ) {}

  async ngOnInit() {
    const data: any = this.route.snapshot.queryParams;
    console.log('data', data);
    if(data?.name) {
      this.name = data.name;
    }
    const id = this.route.snapshot.paramMap.get('id');
    console.log('chat id :', id);
    if(!id) {
      this.navCtrl.back();
      return;
    }
    this.id = id;
    this.gmailid = await this.storage.get('gmailid');
    this.appleid = await this.storage.get('appleid');
    console.log("gmailid :", this.gmailid);
    if(this.gmailid) {
      this.selectedChatRoomMessages = this.api.collectionDataQuery(
        `chats/${this.id}/messages`,
        this.api.orderByQuery('createdAt', 'desc')
      )
      .pipe(map((arr: any) => arr.reverse()));
      this.chats = this.selectedChatRoomMessages;
      console.log('gmailid chat:', this.chats);
    }
    else if (this.appleid) {
      this.selectedChatRoomMessages = this.api.collectionDataQuery(
        `chats/${this.id}/messages`,
        this.api.orderByQuery('createdAt', 'desc')
      )
      .pipe(map((arr: any) => arr.reverse()));
      this.chats = this.selectedChatRoomMessages;
      console.log('appleid chat:', this.chats);
    }
    else {
      this.chatService.getChatRoomsMessages(this.id);
      this.chats = this.chatService.selectedChatRoomMessages;
      console.log('emailid chat:', this.chats);
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    console.log('scroll bottom');
    if(this.chats) this.content.scrollToBottom(500);
  }

  async sendMessage() {
    if(this.gmailid) {
      if(!this.message || this.message?.trim() == '') {
        return;
      }
        this.isLoading = true;
        const new_message = {
          message: this.message,
          sender: this.gmailid,
          createdAt: new Date()
        };
        // console.log(chatId);
        if(this.id) {
          await this.api.addDocument(`chats/${this.id}/messages`, new_message);
        }
        this.message = '';
        this.isLoading = false;
        this.scrollToBottom();
    }
    else if(this.appleid) {
      if(!this.message || this.message?.trim() == '') {
        return;
      }
        this.isLoading = true;
        const new_message = {
          message: this.message,
          sender: this.appleid,
          createdAt: new Date()
        };
        // console.log(chatId);
        if(this.id) {
          await this.api.addDocument(`chats/${this.id}/messages`, new_message);
        }
        this.message = '';
        this.isLoading = false;
        this.scrollToBottom();
    }
    else {
      if(!this.message || this.message?.trim() == '') {
        return;
      }
      try {      
        this.isLoading = true;
        await this.chatService.sendMessage(this.id, this.message);
        this.message = '';
        this.isLoading = false;
        this.scrollToBottom();
      } catch(e) {
        this.isLoading = false;
        console.log(e);
      }
    }
  }

}
