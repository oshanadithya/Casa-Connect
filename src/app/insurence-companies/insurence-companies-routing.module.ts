import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsurenceCompaniesPage } from './insurence-companies.page';

const routes: Routes = [
  {
    path: '',
    component: InsurenceCompaniesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsurenceCompaniesPageRoutingModule {}
