import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassificationSocietiesPage } from './classification-societies.page';

const routes: Routes = [
  {
    path: '',
    component: ClassificationSocietiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassificationSocietiesPageRoutingModule {}
