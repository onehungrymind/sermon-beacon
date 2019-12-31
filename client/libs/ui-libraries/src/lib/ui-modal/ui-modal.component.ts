import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { Media, MediaType, Sermon, Speaker, Tag } from '@sb/core-data';

@Component({
  selector: 'sb-ui-modal',
  templateUrl: './ui-modal.component.html',
  styleUrls: ['./ui-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UiModalComponent {
  @Input() type: string;
  @Input() media?: Media;
  @Input() mediaType?: MediaType;
  @Input() sermon?: Sermon;
  @Input() speaker?: Speaker;
  @Input() tag?: Tag;

  constructor(private dialogRef: MatDialogRef<UiModalComponent>) {}

  composeTitle() {
    if (this.type === 'media') return `"${this.media.type}"`;
    if (this.type === 'mediaType') return `"${this.mediaType.name}"`;
    if (this.type === 'sermon') return `"${this.sermon.title}" ?`;
    if (this.type === 'speaker') return `"${this.speaker.name}" ?`;
    if (this.type === 'tag') return `"${this.tag.property}" ?`;
  }

  confirmDelete() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
