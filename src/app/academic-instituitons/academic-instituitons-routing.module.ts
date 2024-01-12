import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcademicInstituitonsPage } from './academic-instituitons.page';

const routes: Routes = [
  {
    path: '',
    component: AcademicInstituitonsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcademicInstituitonsPageRoutingModule {}
