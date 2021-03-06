import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@sb/material';

import { CallbackComponent } from './callback/callback.component';
import { NoVideoComponent } from './no-video/no-video.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { SearchbarActionsComponent } from './searchbar/searchbar-actions/searchbar-actions.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { UiModalComponent } from './ui-modal/ui-modal.component';
import { UiTableComponent } from './ui-table/ui-table.component';

const COMPONENTS = [
  CallbackComponent,
  NoVideoComponent,
  SearchbarComponent,
  SearchbarActionsComponent,
  ToolbarComponent,
  UiModalComponent,
  UiTableComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule
  ],
  entryComponents: [UiModalComponent],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class UiLibrariesModule {}
