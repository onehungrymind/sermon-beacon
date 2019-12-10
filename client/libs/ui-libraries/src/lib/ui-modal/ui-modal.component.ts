import { Component, ViewEncapsulation, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { Sermon, Speaker, Tag } from '@sb/core-data';

@Component({
  selector: 'sb-ui-modal',
  templateUrl: './ui-modal.component.html',
  styleUrls: ['./ui-modal.component.scss'],
  encapsulation: ViewEncapsulation.None // All modals should have all the same styles.
})
export class UiModalComponent {
  @Input() type: string;
  @Input() sermon?: Sermon;
  @Input() speaker?: Speaker;
  @Input() tag?: Tag;

  constructor(private dialogRef: MatDialogRef<UiModalComponent>) { }

  composeMessage() {
    if (this.type === 'sermon') return `Remove ${this.type} <br/> "${this.sermon.title}" ?`;
    if (this.type === 'speaker') return `Remove ${this.type} <br/> "${this.speaker.first_name} ${this.speaker.last_name}" ?`;
    if (this.type === 'tag') return `Remove ${this.type} <br/> "${this.tag.property}" ?`;
  }

  confirmDelete() {
    this.dialogRef.close(true)
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
