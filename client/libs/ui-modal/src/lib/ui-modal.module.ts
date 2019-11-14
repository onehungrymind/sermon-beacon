import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog'
import { UiModalComponent } from './ui-modal/ui-modal.component';

@NgModule({
  imports: [CommonModule, MatDialogRef],
  declarations: [UiModalComponent]
})
export class UiModalModule {}
