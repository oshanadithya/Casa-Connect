import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShipSupliersPageRoutingModule } from './ship-supliers-routing.module';

import { ShipSupliersPage } from './ship-supliers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShipSupliersPageRoutingModule
  ],
  declarations: [ShipSupliersPage]
})
export class ShipSupliersPageModule {}
