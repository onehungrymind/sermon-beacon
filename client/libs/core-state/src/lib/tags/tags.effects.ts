import { Injectable } from '@angular/core';

import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { EMPTY, iif, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import * as fromTags from './tags.reducer';
import * as TagsActions from './tags.actions';
import { DialogService, Tag, TagsService, NotifyService } from '@sb/core-data';

@Injectable()
export class TagsEffects {
  loadTags$ = createEffect(() =>
    this.dataPersistence.fetch(TagsActions.loadTags, {
      run: (
        action: ReturnType<typeof TagsActions.loadTags>,
        state: fromTags.TagsPartialState
      ) => {
        return this.tagsService.all().pipe(map((res: Tag[]) => TagsActions.loadTagsSuccess({ tags: res })));
      },

      onError: (action: ReturnType<typeof TagsActions.loadTags>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  addTag$ = createEffect(() =>
    this.dataPersistence.fetch(TagsActions.createTag, {
      run: (
        action: ReturnType<typeof TagsActions.createTag>,
        state: fromTags.TagsPartialState
      ) => {
        return this.tagsService.create(action.tag).pipe(map((res: Tag) => TagsActions.createTagSuccess({ tag: res })));
      },

      onError: (action: ReturnType<typeof TagsActions.createTag>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  updateTag$ = createEffect(() =>
    this.dataPersistence.fetch(TagsActions.updateTag, {
      run: (
        action: ReturnType<typeof TagsActions.updateTag>,
        state: fromTags.TagsPartialState
      ) => {
        return this.tagsService.update(action.tag).pipe(map((res: Tag) => TagsActions.updateTagSuccess({ tag: res })));
      },

      onError: (action: ReturnType<typeof TagsActions.updateTag>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  deleteTag$ = createEffect(() =>
    this.dataPersistence.fetch(TagsActions.deleteTag, {
      run: (
        action: ReturnType<typeof TagsActions.deleteTag>,
        state: fromTags.TagsPartialState
      ) => {
        return this.dialogService.deleteDialog(action.tag, 'tag').pipe(
          switchMap((deleteConfirmed: boolean) => iif(
            () => deleteConfirmed,
            of(TagsActions.deleteTagSuccess({tag: action.tag})),
            EMPTY
          ))
        );
      },

      onError: (action: ReturnType<typeof TagsActions.deleteTag>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<fromTags.TagsPartialState>,
    private tagsService: TagsService,
    private dialogService: DialogService,
    private notifyService: NotifyService
  ) {}
}
