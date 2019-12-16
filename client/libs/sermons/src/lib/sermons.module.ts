import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@sb/material';
import { UiLibrariesModule } from '@sb/ui-libraries';

import { SermonsComponent } from './sermons/sermons.component';

@NgModule({
  imports: [
    CommonModule,
    UiLibrariesModule,
    MaterialModule
  ],
  declarations: [SermonsComponent],
  exports: [SermonsComponent],
})
export class SermonsModule { }
