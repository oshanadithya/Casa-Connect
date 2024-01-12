import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagingPageRoutingModule } from './messaging-routing.module';

import { MessagingPage } from './messaging.page';
import { UserListComponent } from '../components/user-list/user-list.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessagingPageRoutingModule,
    // ComponentsModule
  ],
  declarations: [MessagingPage, UserListComponent]
})
export class MessagingPageModule {}
