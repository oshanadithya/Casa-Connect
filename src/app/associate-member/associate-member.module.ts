import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssociateMemberPageRoutingModule } from './associate-member-routing.module';

import { AssociateMemberPage } from './associate-member.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssociateMemberPageRoutingModule
  ],
  declarations: [AssociateMemberPage]
})
export class AssociateMemberPageModule {}
