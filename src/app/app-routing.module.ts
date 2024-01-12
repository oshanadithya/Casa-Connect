import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
  AuthGuard
} from '@angular/fire/auth-guard';
import { Storage } from '@ionic/storage-angular';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['menu/home']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    // canActivate: [AuthGuard]
    // ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule),
    // ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'reg',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'reminders',
    loadChildren: () => import('./reminders/reminders.module').then( m => m.RemindersPageModule)
  },
  {
    path: 'members',
    loadChildren: () => import('./members/members.module').then( m => m.MembersPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'associate-member',
    loadChildren: () => import('./associate-member/associate-member.module').then( m => m.AssociateMemberPageModule)
  },
  {
    path: 'government-institutions',
    loadChildren: () => import('./government-institutions/government-institutions.module').then( m => m.GovernmentInstitutionsPageModule)
  },
  {
    path: 'trade-associations',
    loadChildren: () => import('./trade-associations/trade-associations.module').then( m => m.TradeAssociationsPageModule)
  },
  {
    path: 'ship-repairers',
    loadChildren: () => import('./ship-repairers/ship-repairers.module').then( m => m.ShipRepairersPageModule)
  },
  {
    path: 'bunker-suppliers',
    loadChildren: () => import('./bunker-suppliers/bunker-suppliers.module').then( m => m.BunkerSuppliersPageModule)
  },
  {
    path: 'academic-instituitons',
    loadChildren: () => import('./academic-instituitons/academic-instituitons.module').then( m => m.AcademicInstituitonsPageModule)
  },
  {
    path: 'ship-supliers',
    loadChildren: () => import('./ship-supliers/ship-supliers.module').then( m => m.ShipSupliersPageModule)
  },
  {
    path: 'insurence-companies',
    loadChildren: () => import('./insurence-companies/insurence-companies.module').then( m => m.InsurenceCompaniesPageModule)
  },
  {
    path: 'classification-societies',
    loadChildren: () => import('./classification-societies/classification-societies.module').then( m => m.ClassificationSocietiesPageModule)
  },
  {
    path: 'pi-clubs',
    loadChildren: () => import('./pi-clubs/pi-clubs.module').then( m => m.PiClubsPageModule)
  },
  {
    path: 'ic-t',
    loadChildren: () => import('./ic-t/ic-t.module').then( m => m.IcTPageModule)
  },
  {
    path: 'maritime-lawyers',
    loadChildren: () => import('./maritime-lawyers/maritime-lawyers.module').then( m => m.MaritimeLawyersPageModule)
  },
  {
    path: 'account-delete',
    loadChildren: () => import('./account-delete/account-delete.module').then( m => m.AccountDeletePageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'otp-pg',
    loadChildren: () => import('./otp-pg/otp-pg.module').then( m => m.OtpPgPageModule)
  },
  {
    path: 'exchange-rates',
    loadChildren: () => import('./exchange-rates/exchange-rates.module').then( m => m.ExchangeRatesPageModule)
  },
  {
    path: 'messaging',
    loadChildren: () => import('./messaging/messaging.module').then( m => m.MessagingPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'connect',
    loadChildren: () => import('./connect/connect.module').then( m => m.ConnectPageModule)
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
  ],
  exports: [RouterModule],
})

export class AppRoutingModule { }
