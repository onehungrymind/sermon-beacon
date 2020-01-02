import { Injectable } from '@angular/core';

import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as sermonSpeakersActions from './sermon-speakers.actions';
import { SermonSpeaker, SermonSpeakersService } from '@sb/core-data';
import { SermonSpeakersPartialState } from './sermon-speakers.reducer';
import { NotifyService } from '@sb/ui-libraries';

@Injectable()
export class SermonSpeakersEffects {
  loadSermonSpeakers$ = createEffect(() =>
    this.dataPersistence.fetch(sermonSpeakersActions.loadSermonSpeakers, {
      run: (
        action: ReturnType<typeof sermonSpeakersActions.loadSermonSpeakers>,
        state: SermonSpeakersPartialState
      ) => {
        return this.sermonSpeakersService.all().pipe(
          map((sermonSpeakers: SermonSpeaker[]) => sermonSpeakersActions.sermonSpeakersLoaded({ sermonSpeakers }))
        );
      },
      onError: (action: ReturnType<typeof sermonSpeakersActions.loadSermonSpeakers>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  searchSermons$ = createEffect(() =>
    this.dataPersistence.fetch(sermonSpeakersActions.searchSermons, {
      run: (
        action: ReturnType<typeof sermonSpeakersActions.searchSermons>,
        state: SermonSpeakersPartialState
      ) => {
        return this.sermonSpeakersService.all(action.query).pipe(
          map((sermonSpeakers: SermonSpeaker[]) => sermonSpeakersActions.sermonsSearched({ sermonSpeakers }))
        );
      },
      onError: (action: ReturnType<typeof sermonSpeakersActions.searchSermons>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  // CRUD Commented out since no services for these

  // addSermonSpeaker$ = createEffect(() =>
  //   this.dataPersistence.pessimisticUpdate(sermonSpeakersActions.createSermonSpeaker, {
  //     run: (
  //       action: ReturnType<typeof sermonSpeakersActions.createSermonSpeaker>,
  //       state: SermonSpeakersPartialState
  //     ) => {
  //       return this.sermonSpeakersService.create(action.sermonSpeaker).pipe(
  //         map((sermonSpeaker: SermonSpeaker) => sermonSpeakersActions.sermonSpeakerCreated({ sermonSpeaker }))
  //       );
  //     },
  //     onError: (action: ReturnType<typeof sermonSpeakersActions.createSermonSpeaker>, error) => {
  //       console.log('Effect Error:', error);
  //     }
  //   })
  // );

  // updateSermonSpeaker$ = createEffect(() =>
  //   this.dataPersistence.pessimisticUpdate(sermonSpeakersActions.updateSermonSpeaker, {
  //     run: (
  //       action: ReturnType<typeof sermonSpeakersActions.updateSermonSpeaker>,
  //       state: SermonSpeakersPartialState
  //     ) => {
  //       return this.sermonSpeakersService.update(action.sermonSpeaker).pipe(
  //         map((sermonSpeaker: SermonSpeaker) => sermonSpeakersActions.sermonSpeakerUpdated({ sermonSpeaker }))
  //       );
  //     },
  //     onError: (action: ReturnType<typeof sermonSpeakersActions.updateSermonSpeaker>, error) => {
  //       console.log('Effect Error:', error);
  //     }
  //   })
  // );

  // deleteSermonSpeaker$ = createEffect(() =>
  //   this.dataPersistence.pessimisticUpdate(sermonSpeakersActions.deleteSermonSpeaker, {
  //     run: (
  //       action: ReturnType<typeof sermonSpeakersActions.deleteSermonSpeaker>,
  //       state: SermonSpeakersPartialState
  //     ) => {
  //       return this.sermonSpeakersService.delete(action.sermonSpeaker).pipe(
  //         map((sermonSpeaker: SermonSpeaker) => sermonSpeakersActions.sermonSpeakerDeleted({ sermonSpeaker }))
  //       );
  //     },
  //     onError: (action: ReturnType<typeof sermonSpeakersActions.deleteSermonSpeaker>, error) => {
  //       console.log('Effect Error:', error);
  //     }
  //   })
  // );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<SermonSpeakersPartialState>,
    private sermonSpeakersService: SermonSpeakersService,
    private notifyService: NotifyService
  ) {}
}
