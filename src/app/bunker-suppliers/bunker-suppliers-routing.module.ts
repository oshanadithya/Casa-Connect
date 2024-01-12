import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BunkerSuppliersPage } from './bunker-suppliers.page';

const routes: Routes = [
  {
    path: '',
    component: BunkerSuppliersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BunkerSuppliersPageRoutingModule {}
