import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Sermon } from '@sb/core-data';

@Component({
  selector: 'sb-sermons-dialog',
  templateUrl: './sermons-dialog.component.html',
  styleUrls: ['./sermons-dialog.component.scss']
})
export class SermonsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Sermon) { }
}
