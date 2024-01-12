import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectPage } from './connect.page';

const routes: Routes = [
  {
    path: '',
    component: ConnectPage
  },
  {
    path: 'chats/:id',
    loadChildren: () => import('.././chat/chat.module').then( m => m.ChatPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectPageRoutingModule {}
