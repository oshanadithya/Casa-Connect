import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TradeAssociationsPage } from './trade-associations.page';

const routes: Routes = [
  {
    path: '',
    component: TradeAssociationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TradeAssociationsPageRoutingModule {}
