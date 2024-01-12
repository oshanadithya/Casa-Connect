import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IcTPageRoutingModule } from './ic-t-routing.module';

import { IcTPage } from './ic-t.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IcTPageRoutingModule
  ],
  declarations: [IcTPage]
})
export class IcTPageModule {}
