import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, isPlatform } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp-pg',
  templateUrl: './otp-pg.page.html',
  styleUrls: ['./otp-pg.page.scss'],
})
export class OtpPgPage implements OnInit {

  google_email: any;
  apple_email: any;
  gmailid: any;
  user_id: any;
  appleid: any;
  useremail: any;
  otpNumber1: any;
  otpNumber2: any;
  otpNumber3: any;
  otpNumber4: any;
  otp: any;
  otp_val_msg: string = "";
  verId: any;
  
  constructor(private storage: Storage, private fb: FormBuilder, private loadingController: LoadingController, private router: Router, private alertController: AlertController, public http: HttpClient, private auth: Auth) { }

  async ngOnInit() {
    this.useremail = await this.storage.get('email');
    this.google_email = await this.storage.get('google_email');
    this.apple_email = await this.storage.get('apple_email');
    this.appleid = await this.storage.get('appleid');
    this.gmailid = await this.storage.get('gmailid');
  }

  async back() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.router.navigateByUrl('menu/home');
    await loading.dismiss();
  }

  async showAlert(header: any, message: any) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Okay'],
    });
    await alert.present();
  }

  verify() {
    // this.otp = this.otpNumber1.toString() + this.otpNumber2.toString() + this.otpNumber3.toString() + this.otpNumber4.toString();
    this.otp = this.otpNumber1.toString();
    console.log("OTP :", this.otp);
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const httpOptions = {
      headers: new HttpHeaders ({
        'Content-Type' : 'application/json'
      })
    };
    const url = 'https://casa.evokemusic.net/api/validate_user';
    if(this.useremail) {
      const options = {
        otp: this.otp,
        uuid: this.auth.currentUser?.uid
      }
      this.http.post(url, JSON.stringify(options), httpOptions)
      .subscribe({
        next: (res: any) => {
          console.log('OTP validation', res);
          this.verId = res.status;
          this.storage.set('verId', this.verId);
        },
        error: (error) => {
          console.error(error);
          this.showAlert('OTP not verified', 'Please enter valid otp');
        },
        complete: () => {
          if(this.otp_val_msg == "You enterd OTP is not correct.") {
            this.showAlert("You enterd OTP is not correct.", 'Try again!');
          }
          else {
            this.showAlert('OTP verification', 'Successfull!');
            this.router.navigateByUrl('menu/home');
          }
        }
      });
    }
    else if(this.google_email) {
      const options = {
        otp: this.otp,
        uuid: this.gmailid
      }
      this.http.post(url, JSON.stringify(options), httpOptions)
      .subscribe({
        next: (res: any) => {
          console.log('OTP validation', res);
          this.otp_val_msg = res.message;
          this.verId = res.status;
          this.storage.set('verId', this.verId);
        },
        error: (error) => {
          console.error(error);
          this.showAlert('OTP not verified', 'Please enter valid otp');
        },
        complete: () => {
          if(this.otp_val_msg == "You enterd OTP is not correct.") {
            this.showAlert("You enterd OTP is not correct.", 'Try again!');
          }
          else {
            if(this.otp_val_msg == "You enterd OTP is not correct.") {
              this.showAlert("You enterd OTP is not correct.", 'Try again!');
            }
            else {
              this.showAlert('OTP verification', 'Successfull!');
              this.router.navigateByUrl('menu/home');
            }
          }
        }
      });
    }
    else {
      const options = {
        otp: this.otp,
        uuid: this.appleid
      }
      this.http.post(url, JSON.stringify(options), httpOptions)
      .subscribe({
        next: (res: any) => {
          console.log('OTP validation', res);
          this.verId = res.status;
          this.storage.set('verId', this.verId);
        },
        error: (error) => {
          console.error(error);
          this.showAlert('OTP not verified', 'Please enter valid otp');
        },
        complete: () => {
          if(this.otp_val_msg == "You enterd OTP is not correct.") {
            this.showAlert("You enterd OTP is not correct.", 'Try again!');
          }
          else {
            this.showAlert('OTP verification', 'Successfull!');
            this.router.navigateByUrl('menu/home');
          }
        }
      });
    }
  }

}