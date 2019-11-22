import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MaterialModule } from '@sb/material';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [SidenavComponent],
  exports: [SidenavComponent]
})
export class UiSidenavModule { }
