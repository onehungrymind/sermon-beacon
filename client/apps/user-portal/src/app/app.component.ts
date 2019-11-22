import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UiModalComponent } from '@sb/ui-modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'user-portal';

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialog = this.dialog.open(UiModalComponent);
  }
}
