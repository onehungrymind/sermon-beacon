import { Injectable } from '@angular/core';

import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { iif, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import * as fromSermons from './sermons.reducer';
import * as SermonsActions from './sermons.actions';
import { Sermon, SermonsService } from '@sb/core-data';
import { deleteMediaBySermonId } from '../media/media.actions';
import { DialogService, NotifyService } from '@sb/ui-libraries';
import { SermonsFacade } from './sermons.facade';
import { SermonSpeakersFacade } from '../sermon-speakers/sermon-speakers.facade';

@Injectable()
export class SermonsEffects {
  loadSermons$ = createEffect(() =>
    this.dataPersistence.fetch(SermonsActions.loadSermons, {
      run: (
        action: ReturnType<typeof SermonsActions.loadSermons>,
        state: fromSermons.SermonsPartialState
      ) => {
        return this.sermonsService.all().pipe(
          map((sermons: Sermon[]) => SermonsActions.sermonsLoaded({ sermons }))
        );
      },
      onError: (action: ReturnType<typeof SermonsActions.loadSermons>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  addSermon$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(SermonsActions.createSermon, {
      run: (
        action: ReturnType<typeof SermonsActions.createSermon>,
        state: fromSermons.SermonsPartialState
      ) => {
        return this.sermonsService.create(action.sermon).pipe(
          map((sermon: Sermon) => SermonsActions.sermonCreated({ sermon })),
          tap(() => this.sermonSpeakersFacade.loadSermonSpeakers())
        );
      },
      onError: (action: ReturnType<typeof SermonsActions.createSermon>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  updateSermon$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(SermonsActions.updateSermon, {
      run: (
        action: ReturnType<typeof SermonsActions.updateSermon>,
        state: fromSermons.SermonsPartialState
      ) => {
        return this.sermonsService.update(action.sermon).pipe(
          map((sermon: Sermon) => SermonsActions.sermonUpdated({ sermon }))
        );
      },
      onError: (action: ReturnType<typeof SermonsActions.updateSermon>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  deleteSermon$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(SermonsActions.deleteSermon, {
      run: (
        action: ReturnType<typeof SermonsActions.deleteSermon>,
        state: fromSermons.SermonsPartialState
      ) => {
        return this.dialogService.deleteDialog(action.sermon, 'sermon').pipe(
          switchMap((deleteConfirmed: boolean) =>
            iif(() => deleteConfirmed,
              this.sermonsService.delete(action.sermon).pipe(
                tap((sermon: Sermon) => deleteMediaBySermonId({ sermonId: sermon.id })),
                map((sermon: Sermon) => SermonsActions.sermonDeleted({ sermon })),
                tap(() => this.sermonSpeakersFacade.loadSermonSpeakers())
              ),
              of(SermonsActions.sermonMutationCancelled())
            )
          )
        );
      },
      onError: (action: ReturnType<typeof SermonsActions.deleteSermon>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<fromSermons.SermonsPartialState>,
    private sermonsService: SermonsService,
    private dialogService: DialogService,
    private notifyService: NotifyService,
    private sermonSpeakersFacade: SermonSpeakersFacade
  ) {}
}
