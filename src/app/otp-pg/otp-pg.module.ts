import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtpPgPageRoutingModule } from './otp-pg-routing.module';

import { OtpPgPage } from './otp-pg.page';

import { NgOtpInputModule } from  'ng-otp-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtpPgPageRoutingModule,
    NgOtpInputModule,
    ReactiveFormsModule
  ],
  declarations: [OtpPgPage]
})
export class OtpPgPageModule {}
