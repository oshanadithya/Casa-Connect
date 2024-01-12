import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaritimeLawyersPageRoutingModule } from './maritime-lawyers-routing.module';

import { MaritimeLawyersPage } from './maritime-lawyers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaritimeLawyersPageRoutingModule
  ],
  declarations: [MaritimeLawyersPage]
})
export class MaritimeLawyersPageModule {}
