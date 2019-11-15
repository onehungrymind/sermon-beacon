import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'modal-ui-modal',
  templateUrl: './ui-modal.component.html',
  styleUrls: ['./ui-modal.component.scss']
})
export class UiModalComponent {

  constructor(public dialogRef: MatDialogRef<UiModalComponent>) { }

  confirmDelete() {
    // need to connect to facade
    this.dialogRef.close()
  }

  cancel() {
    this.dialogRef.close();
  }
}
