import { Injectable, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UiModalComponent } from '@sb/ui-libraries';
import { Sermon } from '../../sermons/sermons.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(@Inject(MatDialog) private dialog: MatDialog) { }

  deleteDialog(sermon: Sermon, type: string) {
    const ref = this.dialog.open(UiModalComponent, {});
    ref.componentInstance.sermon = sermon;
    ref.componentInstance.type   = type;

    return ref.afterClosed();
  }

}
