import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShipRepairersPageRoutingModule } from './ship-repairers-routing.module';

import { ShipRepairersPage } from './ship-repairers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShipRepairersPageRoutingModule
  ],
  declarations: [ShipRepairersPage]
})
export class ShipRepairersPageModule {}
