import { Injectable } from '@angular/core';

import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { EMPTY, iif } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import * as fromSpeakers from './speakers.reducer';
import * as SpeakersActions from './speakers.actions';
import { Speaker, SpeakersService } from '@sb/core-data';
import { DialogService, NotifyService } from '@sb/ui-libraries';
import { SpeakersPartialState } from './speakers.reducer';

@Injectable()
export class SpeakersEffects {
  loadSpeakers$ = createEffect(() =>
    this.dataPersistence.fetch(SpeakersActions.loadSpeakers, {
      run: (
        action: ReturnType<typeof SpeakersActions.loadSpeakers>,
        state: fromSpeakers.SpeakersPartialState
      ) => {
        return this.speakersService.all().pipe(
          map((speakers: Speaker[]) => SpeakersActions.speakersLoaded({ speakers }))
        );
      },
      onError: (action: ReturnType<typeof SpeakersActions.loadSpeakers>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  loadCurrentSermonSpeaker$ = createEffect(() =>
    this.dataPersistence.fetch(SpeakersActions.loadSpeakersBySermonId, {
      run: (
        action: ReturnType<typeof SpeakersActions.loadSpeakersBySermonId>,
        state: fromSpeakers.SpeakersPartialState
      ) => {
        return this.speakersService.getSpeakerBySermonId(action.sermonId).pipe(
          map(( speakers: Speaker[]) => SpeakersActions.speakersLoaded({ speakers }))
        );
      },
      onError: (action: ReturnType<typeof SpeakersActions.loadSpeakersBySermonId>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  loadSermonSpeakers$ = createEffect(() =>
    this.dataPersistence.fetch(SpeakersActions.loadSermonSpeakers, {
      run: (
        action: ReturnType<typeof SpeakersActions.loadSermonSpeakers>,
        state: SpeakersPartialState
      ) => {
        return this.speakersService.allSermonSpeakers().pipe(
          map((speakers: Speaker[]) => SpeakersActions.speakersLoaded({ speakers }))
        );
      },
      onError: (action: ReturnType<typeof SpeakersActions.loadSermonSpeakers>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  loadSpeakersBySermonId$ = createEffect(() =>
    this.dataPersistence.fetch(SpeakersActions.loadSpeakersBySermonId, {
      run: (
        action: ReturnType<typeof SpeakersActions.loadSpeakersBySermonId>,
        state: SpeakersPartialState
      ) => {
        return this.speakersService.allBySermonId(action.sermonId).pipe(
          map((speakers: Speaker[]) => SpeakersActions.speakersBySermonIdLoaded({ speakers }))
        );
      },
      onError: (action: ReturnType<typeof SpeakersActions.loadSpeakersBySermonId>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  addSpeaker$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(SpeakersActions.createSpeaker, {
      run: (
        action: ReturnType<typeof SpeakersActions.createSpeaker>,
        state: fromSpeakers.SpeakersPartialState
      ) => {
        return this.speakersService.create(action.speaker).pipe(
          map((speaker: Speaker) => SpeakersActions.speakerUpdated({ speaker }))
        );
      },
      onError: (action: ReturnType<typeof SpeakersActions.createSpeaker>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  updateSpeaker$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(SpeakersActions.updateSpeaker, {
      run: (
        action: ReturnType<typeof SpeakersActions.updateSpeaker>,
        state: fromSpeakers.SpeakersPartialState
      ) => {
        return this.speakersService.update(action.speaker).pipe(
          map((speaker: Speaker) => SpeakersActions.speakerUpdated({ speaker }))
        );
      },
      onError: (action: ReturnType<typeof SpeakersActions.updateSpeaker>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  deleteSpeaker$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(SpeakersActions.deleteSpeaker, {
      run: (
        action: ReturnType<typeof SpeakersActions.deleteSpeaker>,
        state: fromSpeakers.SpeakersPartialState
      ) => {
        return this.dialogService.deleteDialog(action.speaker, 'speaker').pipe(
          switchMap((deleteConfirmed: boolean) =>
            iif(() => deleteConfirmed,
              this.speakersService.delete(action.speaker).pipe(
                map((speaker: Speaker) => SpeakersActions.speakerDeleted({ speaker }))
              ),
              EMPTY
            )
          )
        );
      },
      onError: (action: ReturnType<typeof SpeakersActions.deleteSpeaker>, error) => {
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
