import { Component, OnInit } from '@angular/core';
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { AlertController, LoadingController, isPlatform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
// import { Auth, UserCredential, signInWithCredential } from '@angular/fire/auth';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
// import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { Capacitor } from '@capacitor/core';
import { error } from 'console';
import { SignInWithApple, SignInWithAppleOptions, SignInWithAppleResponse } from '@capacitor-community/apple-sign-in';
import { signInWithPopup, OAuthProvider, User, signInWithCredential, UserCredential } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public mail: any;
  public pass: any;
  username: any;
  credentials!: FormGroup;
  isModalOpen: boolean = false;
  isModalClose: boolean = true;
  log: any;
  user_email: any;
  user_id: any;
  user: User | null = null;
  appleid: any;
  gmailid: any;
  apple_email: any;
  userState: any;
  google_email: any;
  public _uid = new BehaviorSubject<any>(null);

  constructor(private apiService: ApiService, private router: Router, private storage: Storage, private fb: FormBuilder, private loadingController: LoadingController,
    private alertController: AlertController, private authService: AuthService, public http: HttpClient, private auth: Auth, private firestore: Firestore
  ) {

    this.auth.onAuthStateChanged((userState) => {
      this.user = userState;
    });

    if (!isPlatform('capacitor')) {
      GoogleAuth.initialize();
    }
  }

  async ngOnInit() {
    await this.storage.create();
    this.username = await this.storage.get('username');
    this.log = await this.storage.get('log');
    this.user_email = await this.storage.get('email');
    this.user_id = await this.storage.get('userid');
    this.appleid = await this.storage.get('appleid');
    this.apple_email = await this.storage.get('apple_email');

    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    if(this.username || this.user_email || this.appleid != null ) {
      this.router.navigateByUrl('menu/home');
    }
  }

  get email() {
    return this.credentials?.get('email');
  }

  get password() {
    return this.credentials?.get('password');
  }

  async signIn() {
    this.username = await GoogleAuth.signIn();
    const loading = await this.loadingController.create();
    await loading.present();
    
    if(this.username) {
      // console.log("Google signin:", this.username);
      // this.userState = this.username.id;
      // userState
      this.storage.set('userState', false);
      this.http
      .post('https://casa.evokemusic.net/api/login_api', {
        "user_id": this.username.id,
        "email": this.username.email
      })
      .subscribe((response) => {
        console.log("Username | Email :", this.username.id, this.username.email);
        console.log("Response :", response);
      });
      this.router.navigateByUrl('menu/home');
      await this.storage.set('gmailid', this.username.id);
      await this.storage.set('username', this.username);
      await this.storage.set('google_email', this.username.email);
      console.log("Google ID :", this.username.email);
      await loading.dismiss();
    }
  }

  async refreshToken() {
    const response = await GoogleAuth.refresh();
    // console.log("refresh:", response);
  }

  async showAlert(header: any, message: any) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Okay'],
    });
    await alert.present();
  }

  async register (bool: boolean) {
    this.isModalOpen = bool;
    this.router.navigateByUrl('reg');
  }

  async login () {
    const loading = await this.loadingController.create();
    await loading.present();
    const user = await this.authService.login(this.credentials?.value);
    // console.log("Credential Val :", this.credentials?.value);
    if(user == true) {
      await loading.dismiss();
      console.log(this.auth.currentUser?.uid, this.credentials?.value.email);
      this.http
      .post('https://casa.evokemusic.net/api/login_api', {
        "user_id": this.auth.currentUser?.uid,
        "email": this.credentials?.value.email
      })
      .subscribe((response) => {
        // console.log('Email :', this.credentials?.value.email);
        // console.log('login api result :', response);
      });
      // this.storage.set('user_id', this.user_id);
      this.router.navigateByUrl('menu/home');
    }
    else if(user == false) {
      await loading.dismiss();
      this.showAlert('Login failed', 'Please verify your email first!');
    }
    else {
      await loading.dismiss();
      this.showAlert('Login failed', 'Please check your credentials!');
    }
  }

  setOpen(bool: boolean) {
    this.isModalOpen = bool;
  }

  setClose(bool: boolean) {
    this.isModalOpen = bool;
  }

  async setClose2(bool: boolean) {
    this.isModalOpen = bool;
    const loading = await this.loadingController.create();
    await loading.present();
    this.router.navigateByUrl('reg');
    await loading.dismiss();
  }

  openSignIn(){
    if (Capacitor.getPlatform() === 'web') {
      this.signInWithAppleWeb();
    }
    else {
      this.signInWithAppleNative();
    }
  }

  async signInWithAppleWeb() {
    // console.log("Apple Web");
    const provider = new OAuthProvider('apple.com');
    // signInWithPopup(this.auth, provider).then((result: UserCredential) => {
    //   console.log(result);
    //   this.updateUserData(result.user);
    // })
    // .catch((error) => {
    //   console.log('error: ', error);
    // });
    try {
      const result = await signInWithPopup(this.auth, provider);
      // console.log(result);
      this.updateUserData(result.user);
    } catch (error) {
      console.error('Error signing in with Apple:', error);
    }
  }

  signInWithAppleNative() {
    // console.log("Apple Native");
    let options: SignInWithAppleOptions = {
      clientId: 'com.ios.casa',
      redirectURI: 'https://casa-android-c913e.firebaseapp.com/__/auth/handler',
      scopes: 'email',
      state: '12345'
    };

    SignInWithApple.authorize(options).then(async (result: SignInWithAppleResponse) => {
      const provider = new OAuthProvider('apple.com');
      // console.log("Provider", provider);

      const credential = provider.credential({
        idToken: result.response.identityToken,
      });
      // console.log('Credential :', credential);

      const userCredential = await signInWithCredential(
        this.auth, credential
      );
      //console.log("User Credential ", userCredential);

      this.updateUserData(userCredential.user);
      await this.storage.set('appleid', userCredential.user.uid);
      await this.storage.set('apple_email', userCredential.user.email);
      //userState
      this.storage.set('userState', false);
      this.http
      .post('https://casa.evokemusic.net/api/login_api', {
        "user_id": userCredential.user.uid,
        "email": userCredential.user.email
      })
      .subscribe((response) => {
        console.log('Email for apple:', userCredential.user.email);
        console.log('login api result :', response);
        const data = {
          name:  userCredential.user.displayName,
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          photo: userCredential.user.photoURL
        }
        this.apiService.setDocument(`users/${userCredential.user.uid}`, data);
        const userData = {
          id: userCredential.user.uid
        }
        this.setUserData(userCredential.user.uid);
      });
      this.router.navigateByUrl('menu/home');
    })
    .catch((error) => {
      console.log('error: ', error);
    });
  }

  setUserData(uid: any) {
    this._uid.next(uid);
  }

  async getUserData(id: any) {
    const docSnap: any = await this.apiService.getDocById(`users/${id}`);
    if(docSnap?.exists()) {
      return docSnap.data();
    }
    else {
      throw('No such docuent exists');
    }
  }

  async updateUserData(user: User) {
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    let data = {
      email: user.email,
    };
    try {
      await setDoc(userDocRef, data, { merge: true });
      // console.log('User data updated successfully');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  }

  logoutApple() {
    this.auth.signOut();
  }

  async forgetPassword() {
    const loading = await this.loadingController.create();
    this.isModalOpen = false;
    await loading.present();
    this.router.navigateByUrl('reset-password');
    await loading.dismiss();
  }
}