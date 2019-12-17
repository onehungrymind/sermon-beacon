import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTabGroup } from '@angular/material';
import { Sermon } from '@sb/core-data';
import { SermonsComponent } from '../sermons/sermons.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'sb-sermons-dialog',
  templateUrl: './sermons-dialog.component.html',
  styleUrls: ['./sermons-dialog.component.scss']
})
export class SermonsDialogComponent implements OnInit {
  form: FormGroup;
  @ViewChild(MatTabGroup, { static: true }) tabs: MatTabGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SermonsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sermon
  ) {}

  ngOnInit() {
    this.initForm();
  }

  next() {
    this.tabs.selectedIndex = ++this.tabs.selectedIndex;
  }

  back() {
    this.tabs.selectedIndex = --this.tabs.selectedIndex;
  }

  cancel() {
    this.dialogRef.close();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      details: this.formBuilder.group({
        title: [],
        subject: [],
        speakers: [],
        date: []
      }),
      media: this.formBuilder.group({}),
      tags: this.formBuilder.group({})
    });
  }

}
