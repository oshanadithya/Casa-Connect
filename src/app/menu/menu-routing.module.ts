import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then((m) => m.HomePageModule), 
      },
      {
        path: 'network',
        loadChildren: () => import('../network/network.module').then((m) => m.NetworkPageModule),
      },
      {
        path: 'events',
        loadChildren: () => import('../events/events.module').then((m) => m.EventsPageModule),
      },
      {
        path: 'community',
        loadChildren: () => import('../community/community.module').then((m) => m.CommunityPageModule),
      },
      {
        path: 'directory',
        loadChildren: () => import('../directory/directory.module').then((m) => m.DirectoryPageModule),
      },
      {
        path: '',
        redirectTo: 'menu/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
