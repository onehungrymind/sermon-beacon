import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatTabGroup } from '@angular/material';

import { combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MediaFacade, SermonsFacade, TagsFacade } from '@sb/core-state';
import { Sermon } from '@sb/core-data';

@Component({
  selector: 'sb-sermons-dialog',
  templateUrl: './sermons-dialog.component.html',
  styleUrls: ['./sermons-dialog.component.scss']
})
export class SermonsDialogComponent implements OnInit {
  form: FormGroup;
  sermon$ = this.sermonFacade.selectedSermon$;
  sermonMedia$ = this.mediaFacade.allMedia$;
  sermonTags$ = this.tagsFacade.allTags$;
  @ViewChild(MatTabGroup, { static: true }) tabGroup: MatTabGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sermonFacade: SermonsFacade,
    private mediaFacade: MediaFacade,
    private tagsFacade: TagsFacade,
    @Inject(MAT_DIALOG_DATA) public data: Sermon
  ) {}

  ngOnInit() {
    const { id } = this.data;
    this.initForm();
    if (this.data && id) {
      this.sermonFacade.selectSermon(id);
      this.mediaFacade.loadMediaBySermonId(id);
      this.tagsFacade.loadTagsBySermonId(id);
      this.selectSermon$().subscribe();
    }
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

  selectSermon$() {
    return combineLatest([
      this.sermon$,
      this.sermonMedia$,
      this.sermonTags$
    ]).pipe(
      tap(([sermon, media, tags]) => {
        this.form.patchValue({
          details: sermon,
          media,
          tags: { tags }
        });
      })
    );
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
