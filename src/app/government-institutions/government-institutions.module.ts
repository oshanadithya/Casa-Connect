import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GovernmentInstitutionsPageRoutingModule } from './government-institutions-routing.module';

import { GovernmentInstitutionsPage } from './government-institutions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GovernmentInstitutionsPageRoutingModule
  ],
  declarations: [GovernmentInstitutionsPage]
})
export class GovernmentInstitutionsPageModule {}
