import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@sb/material';

import { UiModalComponent } from './ui-modal/ui-modal.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [UiModalComponent],
  entryComponents: [UiModalComponent],
  exports: [UiModalComponent]
})
export class UiModalModule {}
