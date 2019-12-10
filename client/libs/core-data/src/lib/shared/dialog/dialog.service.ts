import { Injectable, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UiModalComponent } from '@sb/ui-libraries';
import { Sermon } from '../../sermons/sermons.model';
import { Speaker } from '../../speakers/speakers.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(@Inject(MatDialog) private dialog: MatDialog) { }

  deleteDialog(feature: any, type: string) {
    const ref = this.dialog.open(UiModalComponent, {});
    ref.componentInstance.type = type;

    if (feature as Sermon) {
      ref.componentInstance.sermon = feature;
    }
    if (feature as Speaker) {
      ref.componentInstance.speaker = feature;
    }

    return ref.afterClosed();
  }

}
