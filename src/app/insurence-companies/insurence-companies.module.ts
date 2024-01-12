import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsurenceCompaniesPageRoutingModule } from './insurence-companies-routing.module';

import { InsurenceCompaniesPage } from './insurence-companies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsurenceCompaniesPageRoutingModule
  ],
  declarations: [InsurenceCompaniesPage]
})
export class InsurenceCompaniesPageModule {}
