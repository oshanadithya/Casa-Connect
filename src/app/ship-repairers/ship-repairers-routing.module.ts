import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShipRepairersPage } from './ship-repairers.page';

const routes: Routes = [
  {
    path: '',
    component: ShipRepairersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShipRepairersPageRoutingModule {}
