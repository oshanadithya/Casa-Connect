import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../services/auth.service';
import { Auth, UserCredential, signInWithCredential,  } from '@angular/fire/auth';
import {signInWithPopup, OAuthProvider, User } from 'firebase/auth';
import { AlertController, LoadingController, isPlatform } from '@ionic/angular';
import { Ng2SearchPipe } from 'ng2-search-filter';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ChatService } from '../services/chat/chat.service';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  base64Image: any;
  userName:any;
  email:any;
  username: any;
  email_user: any;
  log: any;
  user_email: any;
  appleid: any;
  user: User | null = null;
  apple_email: any;
  isModalOpen: boolean = false;
  isModalClose: boolean = true;
  member: any;
  value: any = 1;
  latestRate: any = [];

  constructor(
    private router: Router,
    private storage: Storage, 
    private authService: AuthService,
    private auth: Auth,
    private loadingController: LoadingController,
    private alertController: AlertController,
    public http: HttpClient,
    private chatService: ChatService
  ) {
    this.auth.onAuthStateChanged((userState) => {
      // console.log('User Changed');
      this.user = userState;
    })
    if (!isPlatform('capacitor')) {
      GoogleAuth.initialize();
    }
  }

  async ngOnInit() {
    await this.storage.create();
    this.log = await this.storage.get('log');
    this.username = await this.storage.get('username');
    // console.log(this.username);
    this.user_email = await this.storage.get('email');
    this.appleid = await this.storage.get('appleid');
    this.apple_email = await this.storage.get('apple_email');
    this.member = await this.storage.get('userState');
    this.val(this.value);
    this.getLatestEx();

    // ////////////////////
    console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        alert('Push registration success, token: ' + token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );

    // ////////////////////
    await SplashScreen.hide();
  }

  contactUs() {
    this.router.navigateByUrl('contact-us');
  }

  public async openPage(page: any) {
    await SplashScreen.show({
      showDuration: 2000,
      autoHide: true,
    });
  }

  async signOut() {
    if(this.username != null){
      await GoogleAuth.signOut();
      // console.log("Google Signout");
      await this.storage.remove('username');
      await this.storage.remove('userState');
      await this.storage.remove('google_email');
      await this.storage.remove('gmailid');
      this.router.navigateByUrl('login');
    }
    else if(this.user_email != null) {
      await this.authService.logout();
      // console.log("E&P Signout");
      await this.storage.remove('email');
      await this.storage.remove('userid');
      await this.storage.remove('userState');
      // this.chatService.logout();
      this.router.navigateByUrl('login');
    }
    else if(this.appleid != null) {
      this.auth.signOut();
      // console.log("AppleId Signout");
      await this.storage.remove('appleid');
      await this.storage.remove('apple_email');
      await this.storage.remove('userState');
      this.router.navigateByUrl('login');
    }
    else {
      console.log("Signout Error Occured");
    }
  }

  async reminder() {
    
  }

  privacy() {
    this.router.navigateByUrl('privacy');
  }

  setOpen(bool: boolean) {
    this.isModalOpen = bool;
  }

  setClose(bool: boolean) {
    this.isModalOpen = bool;
  }

  async deleteAccount() {
    this.router.navigateByUrl('account-delete');
  }
  
  userProfile() {
    this.router.navigateByUrl('profile');
  }

  val(val: any) {
    if(val == 1) {
      this.value = val;
    }
    else if(val == 2) {
      this.value = val;
    }
    else if(val == 3) {
      this.value = val;
    }
    else if(val == 4) {
      this.value = val;
    }
    else {
      this.value = val;
    }
  }

  exchangePage() {
    this.router.navigateByUrl('exchange-rates');
  }

  getLatestEx() {
    this.http.get('https://casa.evokemusic.net/api/exchangeRate').subscribe((res:any) => {
      this.latestRate = res;
      // console.log("Rate :", this.latestRate);
    },(error:any) => {
      console.log("Error", error);
    })
  }

  messages() {
    this.router.navigateByUrl('messaging');
  }

}