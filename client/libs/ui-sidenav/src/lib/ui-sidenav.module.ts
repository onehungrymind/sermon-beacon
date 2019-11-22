import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@sb/material';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [SidenavComponent],
  exports: [SidenavComponent]
})
export class UiSidenavModule { }
