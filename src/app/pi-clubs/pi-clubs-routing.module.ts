import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PiClubsPage } from './pi-clubs.page';

const routes: Routes = [
  {
    path: '',
    component: PiClubsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PiClubsPageRoutingModule {}
