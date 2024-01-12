import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../services/auth.service';
import { Auth, UserCredential, signInWithCredential,  } from '@angular/fire/auth';
import {signInWithPopup, OAuthProvider, User } from 'firebase/auth';
import { AlertController, LoadingController, isPlatform } from '@ionic/angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.page.html',
  styleUrls: ['./account-delete.page.scss'],
})
export class AccountDeletePage implements OnInit {
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
  uid: any;
  adRespons: any;

  constructor(private router: Router,
    private storage: Storage, 
    private authService: AuthService,
    private auth: Auth,
    private loadingController: LoadingController,
    private alertController: AlertController,
    public http: HttpClient) { }

  async ngOnInit() {
    await this.storage.create();
    this.log = await this.storage.get('log');
    this.username = await this.storage.get('username');
    this.user_email = await this.storage.get('email');
    this.appleid = await this.storage.get('appleid');
    this.apple_email = await this.storage.get('apple_email');
    this.uid = await this.storage.get('userid');
    await SplashScreen.hide();
  }

  async signOut() {
    if(this.username != null){
      await GoogleAuth.signOut();
      // console.log("Google Signout");
      await this.storage.remove('username');
      await this.storage.remove('userState');
      this.router.navigateByUrl('login');
    }
    else if(this.user_email != null) {
      await this.authService.logout();
      // console.log("E&P Signout");
      await this.storage.remove('email');
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

  setClose() {
    this.router.navigateByUrl('menu/home');
  }

  async showAlert(header: any, message: any) {
    const alert = await this.alertController.create({
      header: 'Account deletion processing',
      message,
      buttons: ['Okay'],
    });
    await alert.present();
  }

  async deleteAccount() {
    const alert = await this.alertController.create({
      header: 'Confirm Account Deletion',
      message: 'Are you sure you want to delete your account?',
      buttons: [
        {text: 'Cancel', role: 'cancel'}, 
        {text: 'Delete', 
          handler: async () => {
            if(this.auth.currentUser?.uid) {

              const loading = await this.loadingController.create();
              await loading.present();
              var headers = new Headers();
              headers.append("Accept", 'application/json');
              headers.append('Content-Type', 'application/json' );
              const httpOptions = {
                headers: new HttpHeaders ({
                  'Content-Type' : 'application/json'
                })
              };
                const url = 'https://casa.evokemusic.net/api/deactivate';
                const options = {
                  "user_id": this.auth.currentUser?.uid
                }
                // console.log("email det", this.uid);
                this.http.post(url, JSON.stringify(options), httpOptions)
                .subscribe({
                  next: (res: any) => {
                    // console.log('', res);
                    this.adRespons = res;
                  },
                  error: error => console.error(error),
                  complete: () => {
                    this.showAlert('', 'Your account will be deleted within 30 days');
                    console.log("Casa Account deleted", this.adRespons);
                  }
                });
              await this.storage.remove('userid');
              // await this.storage.remove('google_email');
              await loading.dismiss();
              await this.signOut();

            }
            else if(this.username.id) {

              const loading = await this.loadingController.create();
              await loading.present();
              var headers = new Headers();
              headers.append("Accept", 'application/json');
              headers.append('Content-Type', 'application/json' );
              const httpOptions = {
                headers: new HttpHeaders ({
                  'Content-Type' : 'application/json'
                })
              };
                const url = 'https://casa.evokemusic.net/api/deactivate';
                const options = {
                  "user_id": this.username.id
                }
                // console.log("email det", this.uid);
                this.http.post(url, JSON.stringify(options), httpOptions)
                .subscribe({
                  next: (res: any) => {
                    // console.log('', res);
                    this.adRespons = res;
                  },
                  error: error => console.error(error),
                  complete: () => {
                    this.showAlert('', 'Your account will be deleted within 30 days');
                    console.log("Google Account deleted", this.adRespons);
                  }
                });
              await this.storage.remove('username');
              await this.storage.remove('gmailid');
              await loading.dismiss();
              await this.signOut();

            }
            else {

              const loading = await this.loadingController.create();
              await loading.present();
              var headers = new Headers();
              headers.append("Accept", 'application/json');
              headers.append('Content-Type', 'application/json' );
              const httpOptions = {
                headers: new HttpHeaders ({
                  'Content-Type' : 'application/json'
                })
              };
                const url = 'https://casa.evokemusic.net/api/deactivate';
                const options = {
                  "user_id": this.appleid
                }
                // console.log("email det", this.uid);
                this.http.post(url, JSON.stringify(options), httpOptions)
                .subscribe({
                  next: (res: any) => {
                    // console.log('', res);
                    this.adRespons = res;
                  },
                  error: error => console.error(error),
                  complete: () => {
                    this.showAlert('', 'Your account will be deleted within 30 days');
                    console.log("Apple Account deleted", this.adRespons);
                  }
                });
              // await this.storage.remove('appleid');
              // await this.storage.remove('apple_email');
              await loading.dismiss();
              await this.signOut();

            }
          },
        },
      ],
    });
    await alert.present();
  }

}
