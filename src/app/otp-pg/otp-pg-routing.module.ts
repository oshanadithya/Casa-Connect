import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtpPgPage } from './otp-pg.page';

const routes: Routes = [
  {
    path: '',
    component: OtpPgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtpPgPageRoutingModule {}
