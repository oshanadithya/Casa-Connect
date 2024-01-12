import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExchangeRatesPageRoutingModule } from './exchange-rates-routing.module';

import { ExchangeRatesPage } from './exchange-rates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExchangeRatesPageRoutingModule
  ],
  declarations: [ExchangeRatesPage]
})
export class ExchangeRatesPageModule {}
