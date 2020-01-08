import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatTabGroup } from '@angular/material';

import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { MediaFacade, SermonsFacade, SpeakersFacade, TagsFacade } from '@sb/core-state';
import { Media, Sermon, Tag } from '@sb/core-data';

@Component({
  selector: 'sb-sermons-dialog',
  templateUrl: './sermons-dialog.component.html',
  styleUrls: ['./sermons-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SermonsDialogComponent implements OnDestroy, OnInit {
  form: FormGroup;
  selectedIndex = 0;
  destroy$ = new Subject;
  sermon$ = this.sermonFacade.aggregatedSermon$;
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
      this.selectSermon();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }

  next() {
    if (
      this.isFormGroupValid('details') && this.selectedIndex === 0 ||
      this.isFormGroupValid('media') && this.selectedIndex === 1
    ) {
      this.tabGroup.selectedIndex = ++this.selectedIndex;
    }
  }

  back() {
    this.tabGroup.selectedIndex = --this.selectedIndex;
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

  cancel() {
    this.sermonFacade.cancelSermonMutation();
  }

  formValue(group: string) {
    return this.form.get(group).value;
  }

  isFormGroupValid(group: string) {
    return this.form.get(group).valid;
  }

  private selectSermon() {
    return this.sermon$.pipe(
      tap((sermon) => {
        const details = {...sermon, speakerIds: sermon.sermon_speakers.map((speaker) => speaker.id)};
        this.form.patchValue({
          details,
          media: sermon.sermon_media,
          tags: { tags: sermon.sermon_tags }
        });
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  private updateSermonData() {
    const {speakerIds, ...sermonData} = this.formValue('details');
    const media = this.formValue('media');
    const tagData = this.formValue('tags');

    this.sermonFacade.updateSermon(sermonData);
    media.forEach((m: Media) => {
      this.mediaFacade.updateMedia(m);
    });
    this.updateTags(tagData, sermonData);
    this.updateSpeakers(speakerIds, sermonData);
  }

  private updateTags(tagData: {tags: Tag[]}, sermonData: Sermon) {
    if (tagData.tags.length) {
      this.tagsFacade.deleteSermonTags(sermonData.id);
    }
    tagData.tags.forEach((tag: Tag) => {
      const { __typename, id, ...payload } = tag;
      this.tagsFacade.createSermonTags({ sermon_id: sermonData.id, tag: { data: payload } });
    });
  }

  private updateSpeakers(speakerIds: string[], sermonData: Sermon) {
    if (speakerIds.length) {
      this.speakersFacade.deleteSermonSpeakers(sermonData.id);
    }
    speakerIds.forEach((speakerId: string) => {
      this.speakersFacade.createSermonSpeaker({sermon_id: sermonData.id, speaker_id: speakerId });
    });
  }

  private buildCreateQuery() {
    const {speakerIds, ...sermonData} = this.formValue('details');
    const [{id, ...mediaData}] = this.formValue('media');
    const tagData = this.formValue('tags');

    delete sermonData.id;

    return {
      ...sermonData,
      sermon_speakers: {
        data: speakerIds.map((speaker_id: string) => ({speaker_id}))
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
        speakerIds: [[], Validators.compose([Validators.required])],  // Note: Not required for the backend, just frontend
        date: [new Date(), Validators.compose([Validators.required])] // Note: Not required for the backend, just frontend
      }),
      media: this.formBuilder.array([this.mediaGroup()], Validators.required),
      tags: this.formBuilder.group({
        tags: [[]]
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
