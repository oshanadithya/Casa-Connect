import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BunkerSuppliersPageRoutingModule } from './bunker-suppliers-routing.module';

import { BunkerSuppliersPage } from './bunker-suppliers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BunkerSuppliersPageRoutingModule
  ],
  declarations: [BunkerSuppliersPage]
})
export class BunkerSuppliersPageModule {}
