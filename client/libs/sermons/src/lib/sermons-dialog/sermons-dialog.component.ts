import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatTabGroup } from '@angular/material';

import * as moment from 'moment';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { MediaFacade, SermonsFacade, SpeakersFacade, TagsFacade } from '@sb/core-state';
import { Media, Sermon, Tag } from '@sb/core-data';

@Component({
  selector: 'sb-sermons-dialog',
  templateUrl: './sermons-dialog.component.html',
  styleUrls: ['./sermons-dialog.component.scss']
})
export class SermonsDialogComponent implements OnDestroy, OnInit {
  form: FormGroup;
  selectedIndex = 0;
  sermon$ = this.sermonFacade.selectedSermon$;
  sermonMedia$ = this.mediaFacade.allMedia$;
  sermonSpeakers$ = this.speakersFacade.allSermonSpeakers$;
  sermonTags$ = this.tagsFacade.allSermonTags$;
  destroy$ = new Subject();
  @ViewChild(MatTabGroup, { static: true }) tabGroup: MatTabGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sermonFacade: SermonsFacade,
    private speakersFacade: SpeakersFacade,
    private mediaFacade: MediaFacade,
    private tagsFacade: TagsFacade,
    private dialogRef: MatDialogRef<SermonsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sermon
  ) {}

  ngOnInit() {
    const { id } = this.data;
    this.initForm();
    if (this.data && id) {
      this.sermonFacade.selectSermon(id);
      this.mediaFacade.loadMediaBySermonId(id);
      this.speakersFacade.loadSpeakersBySermonId(id);
      this.tagsFacade.loadTagsBySermonId(id);
      this.selectSermon$().pipe(takeUntil(this.destroy$)).subscribe();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }

  next() {
    if (this.formIsValid()) {
      this.tabGroup.selectedIndex = ++this.tabGroup.selectedIndex;
    }
  }

  back() {
    this.tabGroup.selectedIndex = --this.tabGroup.selectedIndex;
  }

  save() {
    if (this.form.valid) {
      if (this.data.id) {
        this.updateSermonData();
        this.dialogRef.close();

        return;
      }
      this.sermonFacade.createSermon(this.buildCreateQuery());
      this.dialogRef.close();
    }
  }

  addMediaGroup() {
    const media = this.form.get('media') as FormArray;
    media.push(this.mediaGroup());
  }

  private selectSermon$() {
    return combineLatest([
      this.sermon$,
      this.sermonMedia$,
      this.sermonSpeakers$,
      this.sermonTags$
    ]).pipe(
      tap(([sermon, media, speakers, tags]) => {
        const details = {...sermon, speakers: speakers.map((speaker) => speaker.id)};
        this.form.patchValue({
          details,
          media,
          tags: { tags }
        });
      })
    );
  }

  private updateSermonData() {
    const {speakers, ...sermonData} = this.form.get('details').value;
    const media = this.form.get('media').value;
    const tagData = this.form.get('tags').value;

    this.sermonFacade.updateSermon(sermonData);
    media.forEach((m: Media) => {
      this.mediaFacade.updateMedia(m);
    });
    this.updateTags(tagData, sermonData);
    this.updateSpeakers(speakers, sermonData);
  }

  private updateTags(tagData: any, sermonData: any) {
    if (tagData.tags.length) {
      this.tagsFacade.deleteSermonTags(sermonData.id);
    }
    tagData.tags.forEach((tag: Tag) => {
      const { __typename, id, ...payload } = tag;
      this.tagsFacade.createSermonTags({ sermon_id: sermonData.id, tag: { data: payload } });
    });
  }

  private updateSpeakers(speakers: string[], sermonData: Sermon) {
    if (speakers.length) {
      this.speakersFacade.deleteSermonSpeakers(sermonData.id);
    }
    speakers.forEach((speakerId: string) => {
      this.speakersFacade.createSermonSpeaker({sermon_id: sermonData.id, speaker_id: speakerId });
    });
  }

  private buildCreateQuery() {
    const {speakers, ...sermonData} = this.form.get('details').value;
    const [{id, ...mediaData}] = this.form.get('media').value;
    const tagData = this.form.get('tags').value;

    delete sermonData.id;

    return {
      ...sermonData,
      sermon_speakers: {
        data: speakers.map((speaker_id: string) => ({speaker_id}))
      },
      media: {
        data: mediaData
      },
      sermon_tags: {
        data: tagData.tags.map((tag: Tag) => ({tag_id: tag.id}))
      }
    };
  }

  private initForm() {
    this.form = this.formBuilder.group({
      details: this.formBuilder.group({
        id: null,
        title: ['', Validators.compose([Validators.required])],
        subject: [''],
        speakers: [[], Validators.compose([Validators.required])],  // Note: Not required for the backend, just frontend
        date: [moment().format('YYYY-MM-DD'), Validators.compose([Validators.required])] // Note: Not required for the backend, just frontend
      }),
      media: this.formBuilder.array([this.mediaGroup()], Validators.required),
      tags: this.formBuilder.group({
        tags: [[]]
      })
    });
  }

  private formIsValid() {
    return this.form.get('details').valid || this.form.get('media').valid;
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
