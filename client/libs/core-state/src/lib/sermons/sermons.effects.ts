import { Injectable } from '@angular/core';

import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { EMPTY, iif, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import * as SermonsActions from './sermons.actions';
import { Sermon, SermonsService } from '@sb/core-data';
import { DialogService, NotifyService } from '@sb/ui-libraries';
import { SermonsPartialState } from './sermons.reducer';

@Injectable()
export class SermonsEffects {
  loadSermons$ = createEffect(() =>
    this.dataPersistence.fetch(SermonsActions.loadSermons, {
      run: (
        action: ReturnType<typeof SermonsActions.loadSermons>,
        state: SermonsPartialState
      ) => {
        return this.sermonsService
          .all()
          .pipe(
            map((res: Sermon[]) =>
              SermonsActions.sermonsLoaded({ sermons: res })
            )
          );
      },

      onError: (
        action: ReturnType<typeof SermonsActions.loadSermons>,
        error
      ) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  addSermon$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(SermonsActions.createSermon, {
      run: (
        action: ReturnType<typeof SermonsActions.createSermon>,
        state: SermonsPartialState
      ) => {
        return this.sermonsService
          .create(action.sermon)
          .pipe(
            map((res: Sermon) => SermonsActions.sermonCreated({ sermon: res }))
          );
      },

      onError: (
        action: ReturnType<typeof SermonsActions.createSermon>,
        error
      ) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  updateSermon$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(SermonsActions.updateSermon, {
      run: (
        action: ReturnType<typeof SermonsActions.updateSermon>,
        state: SermonsPartialState
      ) => {
        return this.sermonsService
          .update(action.sermon)
          .pipe(
            map((res: Sermon) => SermonsActions.sermonUpdated({ sermon: res }))
          );
      },

      onError: (
        action: ReturnType<typeof SermonsActions.updateSermon>,
        error
      ) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  deleteSermon$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(SermonsActions.deleteSermon, {
      run: (
        action: ReturnType<typeof SermonsActions.deleteSermon>,
        state: SermonsPartialState
      ) => {
        return this.dialogService
          .deleteDialog(action.sermon, 'sermon')
          .pipe(
            switchMap((deleteConfirmed: boolean) =>
              iif(
                () => deleteConfirmed,
                of(SermonsActions.sermonDeleted({ sermon: action.sermon })),
                EMPTY
              )
            )
          );
      },

      onError: (
        action: ReturnType<typeof SermonsActions.deleteSermon>,
        error
      ) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<SermonsPartialState>,
    private sermonsService: SermonsService,
    private dialogService: DialogService,
    private notifyService: NotifyService
  ) {}
}
