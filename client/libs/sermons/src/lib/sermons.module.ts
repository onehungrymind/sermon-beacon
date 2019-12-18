import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@sb/material';
import { UiLibrariesModule } from '@sb/ui-libraries';

import { SermonsComponent } from './sermons/sermons.component';
import { SermonsDialogComponent } from './sermons-dialog/sermons-dialog.component';
import { SermonsDetailsComponent } from './sermons-dialog/sermons-details/sermons-details.component';
import { SermonsMediaComponent } from './sermons-dialog/sermons-media/sermons-media.component';
import { SermonsTagsComponent } from './sermons-dialog/sermons-tags/sermons-tags.component';

const COMPONENTS = [
  SermonsComponent,
  SermonsDialogComponent,
  SermonsDetailsComponent,
  SermonsMediaComponent,
  SermonsTagsComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiLibrariesModule,
    MaterialModule
  ],
  declarations: COMPONENTS,
  entryComponents: [SermonsDialogComponent],
  exports: COMPONENTS,
})
export class SermonsModule { }
