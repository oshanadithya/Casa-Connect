import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { DirectoryPageRoutingModule } from './directory-routing.module';
import { DirectoryPage } from './directory.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Injectable({
  providedIn: 'root'
})

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: DirectoryPage }]),
    DirectoryPageRoutingModule,
  ],
  declarations: [DirectoryPage],
  exports: [DirectoryPage],
  providers: []
})
export class DirectoryPageModule {}
