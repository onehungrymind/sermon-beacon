import { Injectable } from '@angular/core';

import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { EMPTY, iif, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import * as SpeakersActions from './speakers.actions';
import { DialogService, NotifyService, SpeakersService, Speaker } from '@sb/core-data';
import { SpeakersPartialState } from './speakers.reducer';

@Injectable()
export class SpeakersEffects {
  loadSpeakers$ = createEffect(() =>
    this.dataPersistence.fetch(SpeakersActions.loadSpeakers, {
      run: (
        action: ReturnType<typeof SpeakersActions.loadSpeakers>,
        state: SpeakersPartialState
      ) => {
        this.speakersService.all().pipe(map((res: Speaker[]) => SpeakersActions.loadSpeakersSuccess({ speakers: res })));
      },

      onError: (
        action: ReturnType<typeof SpeakersActions.loadSpeakers>,
        error
      ) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  addSpeaker$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(SpeakersActions.createSpeaker, {
      run: (
        action: ReturnType<typeof SpeakersActions.createSpeaker>,
        state: SpeakersPartialState
      ) => {
        return this.speakersService.create(action.speaker);
      },

      onError: (
        action: ReturnType<typeof SpeakersActions.createSpeaker>,
        error
      ) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  updateSpeaker$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(SpeakersActions.updateSpeaker, {
      run: (
        action: ReturnType<typeof SpeakersActions.updateSpeaker>,
        state: SpeakersPartialState
      ) => {
        return this.speakersService.update(action.speaker);
      },

      onError: (
        action: ReturnType<typeof SpeakersActions.updateSpeaker>,
        error
      ) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  deleteSpeaker$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(SpeakersActions.deleteSpeaker, {
      run: (
        action: ReturnType<typeof SpeakersActions.deleteSpeaker>,
        state: SpeakersPartialState
      ) => {
        return this.dialogService.deleteDialog(action.speaker, 'speaker').pipe(
          switchMap((deleteConfirmed: boolean) => iif(
            () => deleteConfirmed,
            of(SpeakersActions.deleteSpeakerSuccess({speaker: action.speaker})),
            EMPTY
          ))
        );
      },

      onError: (
        action: ReturnType<typeof SpeakersActions.deleteSpeaker>,
        error
      ) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<SpeakersPartialState>,
    private speakersService: SpeakersService,
    private dialogService: DialogService,
    private notifyService: NotifyService
  ) {}
}
