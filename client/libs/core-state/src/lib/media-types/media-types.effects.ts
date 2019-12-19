import { Injectable } from '@angular/core';

import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map, switchMap } from 'rxjs/operators';

import * as fromMediaTypes from './media-types.reducer';
import * as MediaTypesActions from './media-types.actions';
import { MediaType, MediaTypesService } from '@sb/core-data';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { DialogService, NotifyService } from '@sb/ui-libraries';
import { EMPTY, iif } from 'rxjs';

@Injectable()
export class MediaTypesEffects {
  loadMediaTypes$ = createEffect(() =>
    this.dataPersistence.fetch(MediaTypesActions.loadMediaTypes, {
      run: (
        action: ReturnType<typeof MediaTypesActions.loadMediaTypes>,
        state: fromMediaTypes.MediaTypesPartialState
      ) => {
        return this.mediaTypeService.all().pipe(
          map((mediaTypes: MediaType[]) => MediaTypesActions.mediaTypeLoaded({ mediaTypes }))
        );
      },
      onError: (action: ReturnType<typeof MediaTypesActions.loadMediaTypes>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  addMediaType$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(MediaTypesActions.createMediaType, {
      run: (
        action: ReturnType<typeof MediaTypesActions.createMediaType>,
        state: fromMediaTypes.MediaTypesPartialState
      ) => {
        return this.mediaTypeService.create(action.mediaType).pipe(
          map((mediaType: MediaType) => MediaTypesActions.mediaTypeCreated({ mediaType }))
        );
      },
      onError: (action: ReturnType<typeof MediaTypesActions.createMediaType>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  updateMediaType$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(MediaTypesActions.updateMediaType, {
      run: (
        action: ReturnType<typeof MediaTypesActions.updateMediaType>,
        state: fromMediaTypes.MediaTypesPartialState
      ) => {
        return this.mediaTypeService.update(action.mediaType).pipe(
          map((mediaType: MediaType) => MediaTypesActions.mediaTypeUpdated({ mediaType }))
        );
      },
      onError: (action: ReturnType<typeof MediaTypesActions.updateMediaType>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  deleteMediaType$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(MediaTypesActions.deleteMediaType, {
      run: (
        action: ReturnType<typeof MediaTypesActions.deleteMediaType>,
        state: fromMediaTypes.MediaTypesPartialState
      ) => {
        return this.dialogService.deleteDialog(action.mediaType, 'mediaType').pipe(
          switchMap((deleteConfirmed: boolean) =>
            iif(() => deleteConfirmed,
              this.mediaTypeService.delete(action.mediaType).pipe(
                map((mediaType: MediaType) => MediaTypesActions.mediaTypeDeleted({ mediaType }))
              ),
              EMPTY
            )
          )
        );
      },
      onError: (action: ReturnType<typeof MediaTypesActions.deleteMediaType>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<fromMediaTypes.MediaTypesPartialState>,
    private mediaTypeService: MediaTypesService,
    private notifyService: NotifyService,
    private dialogService: DialogService
  ) {}
}
