import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { AlertController, LoadingController, isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  mail!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private auth: Auth, private alertController: AlertController,) { }

  ngOnInit() {
    this.mail = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async showAlertResetPassword(header: any, message: any) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Okay'],
    });
    await alert.present();
  }

  get email() {
    return this.mail?.get('email');
  }

  back() {
    this.router.navigateByUrl('login');
  }

  async resetPassword() {
    this.showAlertResetPassword('Password Resetting in process', 'Please check your email to reset password!');
    const resetPassword = await sendPasswordResetEmail(this.auth, this.mail?.value.email);
    this.back();
  }

}
