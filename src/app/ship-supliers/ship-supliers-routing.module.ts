import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShipSupliersPage } from './ship-supliers.page';

const routes: Routes = [
  {
    path: '',
    component: ShipSupliersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShipSupliersPageRoutingModule {}
