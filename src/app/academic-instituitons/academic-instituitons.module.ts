import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcademicInstituitonsPageRoutingModule } from './academic-instituitons-routing.module';

import { AcademicInstituitonsPage } from './academic-instituitons.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcademicInstituitonsPageRoutingModule
  ],
  declarations: [AcademicInstituitonsPage]
})
export class AcademicInstituitonsPageModule {}
