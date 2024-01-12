import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssociateMemberPage } from './associate-member.page';

const routes: Routes = [
  {
    path: '',
    component: AssociateMemberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssociateMemberPageRoutingModule {}
