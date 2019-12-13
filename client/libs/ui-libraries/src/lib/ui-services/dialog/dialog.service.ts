import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UiModalComponent } from '../../ui-modal/ui-modal.component';
import { Sermon, Speaker, Tag } from '@sb/core-data';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(@Inject(MatDialog) private dialog: MatDialog) {}

  deleteDialog(feature: any, type: string) {
    const ref = this.dialog.open(UiModalComponent);
    ref.componentInstance.type = type;

    if (feature as Sermon) {
      ref.componentInstance.sermon = { ...feature };
    }
    if (feature as Speaker) {
      ref.componentInstance.speaker = { ...feature };
    }
    if (feature as Tag) {
      ref.componentInstance.tag = { ...feature };
    }

    return ref.afterClosed();
  }
}
