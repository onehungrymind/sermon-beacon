import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiLibrariesModule } from '@sb/ui-libraries';

import { SermonsComponent } from './sermons/sermons.component';
import { SermonListComponent } from './sermons/sermon-list/sermon-list.component';
import { MaterialModule } from '@sb/material';

@NgModule({
  imports: [
    CommonModule,
    UiLibrariesModule,
    MaterialModule
  ],
  declarations: [
    SermonsComponent,
    SermonListComponent
  ],
  exports: [
    SermonsComponent,
    SermonListComponent
  ],
})
export class SermonsModule { }
