import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassificationSocietiesPageRoutingModule } from './classification-societies-routing.module';

import { ClassificationSocietiesPage } from './classification-societies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassificationSocietiesPageRoutingModule
  ],
  declarations: [ClassificationSocietiesPage]
})
export class ClassificationSocietiesPageModule {}
