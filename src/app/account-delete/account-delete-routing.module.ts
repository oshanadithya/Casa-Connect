import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountDeletePage } from './account-delete.page';

const routes: Routes = [
  {
    path: '',
    component: AccountDeletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountDeletePageRoutingModule {}
