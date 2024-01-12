import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, getAuth, getAdditionalUserInfo, } from '@angular/fire/auth';
import {AlertController, LoadingController, isPlatform} from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from './api/api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public _uid = new BehaviorSubject<any>(null);
  emailUserDet: any;
  uid: any;
  currentUser: any;

  constructor(private apiService: ApiService, private auth: Auth, private alertController: AlertController, private storage: Storage) { }

  async ngOnit() {
    await this.storage.create();
    this.emailUserDet = await this.storage.get('emailUserDet');
    // this.uid = await this.storage.get('userid');
  }

  async register ({name, email, password}: {name: any; email: any; password: any}) {
    // if(this.emailUserDet == email) {
    //   return this.emailUserDet;
    // }
    // else {
      // console.log("Email Password", email, password);
      try {
        const user = await createUserWithEmailAndPassword(
          this.auth,
          email,
          password
        );
        const data = {
          name: name,
          email: email,
          uid: user.user.uid,
          photo: 'http://i.pravatar.cc/' + this.randomIntFromInterval(200, 400)
        }
        // console.log("Auth Service Reg: ", user);
        await sendEmailVerification(user.user);
        await this.storage.set('emailUserDet', user.user.email);
        await this.apiService.setDocument(`users/${user.user.uid}`, data);
        const userData = {
          id: user.user.uid
        }
        return user;
      }
      catch (e) {
        return null;
      }
    // }
  }

  async login ({email, password}: { email: any; password: any}) {
    // console.log("Email Password", email, password);
    try {
      const user = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      if(user) {
        const u = user.user.emailVerified;
        // const userid = this.auth.currentUser?.uid;
        await this.storage.set('email', email);
        await this.storage.set('userid', this.auth.currentUser?.uid);
        this.uid = await this.storage.get('userid');
        this.setUserData(user.user.uid);
        // console.log("User ID :", this.uid);
        return u;
      }
      else {
        return null;
      }
    }
    catch (e) {
      return null;
    }
  }

  logout() {
    return signOut(this.auth);
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

  getId() {
    const auth = getAuth();
    this.currentUser = this.auth.currentUser;
    return this.currentUser?.uid;
  }
  
  setUserData(uid: any) {
    this._uid.next(uid);
  }

  randomIntFromInterval(min: any, max: any) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
