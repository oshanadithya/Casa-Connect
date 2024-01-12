import { Component, OnInit } from '@angular/core';
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { AlertController, LoadingController, isPlatform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, getAuth, getAdditionalUserInfo,  } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: any;
  credentials!: FormGroup;
  isModalOpen = false;
  emailUserDet: any;

  constructor(private router: Router, private authService: AuthService,private fb: FormBuilder, private alertController: AlertController, private loadingController: LoadingController, private storage: Storage) { }

  async ngOnInit() {
    this.credentials = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]]
    });
    await this.storage.create();
    this.emailUserDet = await this.storage.get('emailUserDet');
  }

  async showAlert(header: any, message: any) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Okay'],
    });
    await alert.present();
  }

  get email() {
    return this.credentials?.get('email');
  }

  get password() {
    return this.credentials?.get('password');
  }

  get name() {
    return this.credentials?.get('name');
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();
    if(this.credentials.value.confirm_password == this.credentials.value.password) {
      const user = await this.authService.register(this.credentials?.value);
      // console.log("Credentials : ",this.credentials?.value);
      console.log("Reg User Det: ", user);
      await loading.dismiss();
      if(user) {
        this.router.navigateByUrl('login');
        this.showAlert('You are successfully Registered ', 'Please verify email!');
      }
      // else if(user == this.emailUserDet) {
      //   await loading.dismiss();
      //   this.showAlert('Email is already used', 'Please enter different email!');
      // }
      else {
        await loading.dismiss();
        this.showAlert('Already registered user', 'Please use a different email');
      }
    }
    else {
      await loading.dismiss();
      this.showAlert('Passwords not matching', 'Please try again!');
    }
  }

  back() {
    this.router.navigateByUrl('login');
  }

}
