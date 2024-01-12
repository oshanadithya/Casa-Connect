import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaritimeLawyersPage } from './maritime-lawyers.page';

const routes: Routes = [
  {
    path: '',
    component: MaritimeLawyersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaritimeLawyersPageRoutingModule {}
