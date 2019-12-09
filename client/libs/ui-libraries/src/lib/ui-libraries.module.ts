import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@sb/material';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { UiModalComponent } from './ui-modal/ui-modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [UiModalComponent, ToolbarComponent],
  exports: [UiModalComponent, ToolbarComponent]
})
export class UiLibrariesModule {}
