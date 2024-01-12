import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GovernmentInstitutionsPage } from './government-institutions.page';

const routes: Routes = [
  {
    path: '',
    component: GovernmentInstitutionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GovernmentInstitutionsPageRoutingModule {}
