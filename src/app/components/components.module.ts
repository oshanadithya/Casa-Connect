import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';



@NgModule({
  declarations: [EmptyScreenComponent],
  imports: [
    CommonModule
  ],
  exports: [EmptyScreenComponent]
})
export class ComponentsModule { }
