import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UiModalComponent } from '../../ui-modal/ui-modal.component';
import { Media, MediaType, Sermon, Speaker, Tag } from '@sb/core-data';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(@Inject(MatDialog) private dialog: MatDialog) {}

  deleteDialog(feature: any, type: string) {
    const ref = this.dialog.open(UiModalComponent);
    const { componentInstance } = ref;

    componentInstance.type = type;
    if (feature as Media) componentInstance.media = { ...feature };
    if (feature as MediaType) componentInstance.mediaType = { ...feature };
    if (feature as Sermon) componentInstance.sermon = { ...feature };
    if (feature as Speaker) componentInstance.speaker = { ...feature };
    if (feature as Tag) componentInstance.tag = { ...feature };

    return ref.afterClosed();
  }
}
