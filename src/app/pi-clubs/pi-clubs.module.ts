import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PiClubsPageRoutingModule } from './pi-clubs-routing.module';

import { PiClubsPage } from './pi-clubs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PiClubsPageRoutingModule
  ],
  declarations: [PiClubsPage]
})
export class PiClubsPageModule {}
