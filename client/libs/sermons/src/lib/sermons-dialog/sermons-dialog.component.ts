import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatTabGroup } from '@angular/material';

import { Sermon } from '@sb/core-data';
import { SermonsComponent } from '../sermons/sermons.component';

@Component({
  selector: 'sb-sermons-dialog',
  templateUrl: './sermons-dialog.component.html',
  styleUrls: ['./sermons-dialog.component.scss']
})
export class SermonsDialogComponent implements OnInit {
  form: FormGroup;
  @ViewChild(MatTabGroup, { static: true }) tabGroup: MatTabGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SermonsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sermon
  ) {}

  ngOnInit() {
    this.initForm();
  }

  next() {
    this.tabGroup.selectedIndex = ++this.tabGroup.selectedIndex;
  }

  back() {
    this.tabGroup.selectedIndex = --this.tabGroup.selectedIndex;
  }

  addMediaGroup() {
    const media = this.form.get('media') as FormArray;
    media.push(this.mediaGroup());
  }

  private initForm() {
    this.form = this.formBuilder.group({
      details: this.formBuilder.group({
        id: null,
        title: ['', Validators.compose([Validators.required])],
        subject: [''],
        speakers: [[], Validators.compose([Validators.required])],  // Note: Not required for the backend, just frontend
        date: ['', Validators.compose([Validators.required])] // Note: Not required for the backend, just frontend
      }),
      media: this.formBuilder.array([this.mediaGroup()], Validators.required),
      tags: this.formBuilder.group({
        tags: [[], Validators.compose([Validators.required])]
      })
    });
  }

  private mediaGroup() {
    return this.formBuilder.group({
      id: null,
      type: ['', Validators.compose([Validators.required])],
      url: [''],
      embedCode: ['']
    });
  }

}
