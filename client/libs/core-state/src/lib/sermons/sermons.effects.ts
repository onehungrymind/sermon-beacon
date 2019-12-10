import { Injectable } from '@angular/core';

import { createEffect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map, switchMap } from 'rxjs/operators';

import * as SermonsActions from './sermons.actions';
import { SermonsPartialState } from './sermons.reducer';
import { Sermon, SermonsService, DialogService } from '@sb/core-data';
import { iif, of, EMPTY } from 'rxjs';

@Injectable()
export class SermonsEffects {
  loadSermons$ = createEffect(() =>
    this.dataPersistence.fetch(SermonsActions.loadSermons, {
      run: (
        action: ReturnType<typeof SermonsActions.loadSermons>,
        state: SermonsPartialState
      ) => {
        return this.sermonsService.all().pipe(map((res: Sermon[]) => SermonsActions.loadSermonsSuccess({ sermons: res })));
      },

      onError: (
        action: ReturnType<typeof SermonsActions.loadSermons>,
        error
      ) => {
        console.error('Error', error);
      }
    })
  );

  addSermon$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(SermonsActions.createSermon, {
      run: (
        action: ReturnType<typeof SermonsActions.createSermon>,
        state: SermonsPartialState
      ) => {
        return this.sermonsService.create(action.sermon).pipe(
          map((res: Sermon) => SermonsActions.createSermonSuccess({ sermon: res }))
        );
      },

      onError: (action: ReturnType<typeof SermonsActions.createSermon>, error) => {
        console.error('Error', error);
      }
    })
    );

  updateSermon$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(SermonsActions.updateSermon, {
      run: (
        action: ReturnType<typeof SermonsActions.updateSermon>,
        state: SermonsPartialState
      ) => {
        return this.sermonsService.update(action.sermon).pipe(
          map((res: Sermon) => SermonsActions.updateSermonSuccess({ sermon: res}))
        );
      },

      onError: (action: ReturnType<typeof SermonsActions.updateSermon>, error) => {
        console.error('Error', error)
      }
    })
  );

  deleteSermon$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(SermonsActions.deleteSermon, {
      run: (
        action: ReturnType<typeof SermonsActions.deleteSermon>,
        state: SermonsPartialState
      ) => {
        return this.dialogService.deleteDialog(action.sermon, 'sermon').pipe(
          switchMap((deleteConfirmed: boolean) => iif(
            () => deleteConfirmed,
            of(SermonsActions.deleteSermonSuccess({sermon: action.sermon})),
            EMPTY
          ))
        )
      },

      onError: (action: ReturnType<typeof SermonsActions.deleteSermon>, error) => {
        console.error('Error', error)
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<SermonsPartialState>,
    private sermonsService: SermonsService,
    private dialogService: DialogService
  ) {}
}
