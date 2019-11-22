import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'modal-ui-modal',
  templateUrl: './ui-modal.component.html',
  styleUrls: ['./ui-modal.component.scss'],
  encapsulation: ViewEncapsulation.None // All modals should have all the same styles.
})
export class UiModalComponent {

  constructor(public dialogRef: MatDialogRef<UiModalComponent>) { }

  // TODO: connect functionality.
  confirmDelete() {
    this.dialogRef.close()
  }

  cancel() {
    this.dialogRef.close();
  }
}
