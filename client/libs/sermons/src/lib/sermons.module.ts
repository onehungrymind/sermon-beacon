import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiLibrariesModule } from '@sb/ui-libraries';

import { SermonsComponent } from './sermons/sermons.component';
import { SermonListComponent } from './sermons/sermon-list/sermon-list.component';
import { SermonDetailsComponent } from './sermons/sermon-details/sermon-details.component';
import { MaterialModule } from '@sb/material';

@NgModule({
  imports: [
    CommonModule,
    UiLibrariesModule,
    MaterialModule
  ],
  declarations: [
    SermonsComponent,
    SermonListComponent,
    SermonDetailsComponent
  ],
  exports: [
    SermonsComponent,
    SermonListComponent,
    SermonDetailsComponent
  ],
})
export class SermonsModule { }
