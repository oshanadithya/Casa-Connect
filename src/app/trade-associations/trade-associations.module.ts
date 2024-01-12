import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TradeAssociationsPageRoutingModule } from './trade-associations-routing.module';

import { TradeAssociationsPage } from './trade-associations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TradeAssociationsPageRoutingModule
  ],
  declarations: [TradeAssociationsPage]
})
export class TradeAssociationsPageModule {}
