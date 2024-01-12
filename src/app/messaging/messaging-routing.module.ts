import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagingPage } from './messaging.page';
import { UserListComponent } from '../components/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: MessagingPage
  },
  {
    path: 'chats/:id',
    loadChildren: () => import('.././chat/chat.module').then( m => m.ChatPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagingPageRoutingModule {}
