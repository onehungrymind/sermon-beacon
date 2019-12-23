import { Injectable } from '@angular/core';

import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { EMPTY, iif, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import * as fromTags from './tags.reducer';
import * as TagsActions from './tags.actions';
import { Tag, TagsService } from '@sb/core-data';
import { DialogService, NotifyService } from '@sb/ui-libraries';

@Injectable()
export class TagsEffects {
  loadTags$ = createEffect(() =>
    this.dataPersistence.fetch(TagsActions.loadTags, {
      run: (
        action: ReturnType<typeof TagsActions.loadTags>,
        state: fromTags.TagsPartialState
      ) => {
        return this.tagsService.all().pipe(
          map((tags: Tag[]) => TagsActions.tagsLoaded({ tags }))
        );
      },
      onError: (action: ReturnType<typeof TagsActions.loadTags>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  loadTagsBySermonId$ = createEffect(() =>
    this.dataPersistence.fetch(TagsActions.loadTagsBySermonId, {
      run: (
        action: ReturnType<typeof TagsActions.loadTagsBySermonId>,
        state: fromTags.TagsPartialState
      ) => {
        return this.tagsService.allBySermonId(action.sermonId).pipe(
          map((tags: Tag[]) => TagsActions.tagsBySermonIdLoaded({ tags }))
        );
      },
      onError: (action: ReturnType<typeof TagsActions.loadTagsBySermonId>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  addTag$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(TagsActions.createTag, {
      run: (
        action: ReturnType<typeof TagsActions.createTag>,
        state: fromTags.TagsPartialState
      ) => {
        return this.tagsService.create(action.tag).pipe(
          map((tag: Tag) => TagsActions.tagCreated({ tag }))
        );
      },
      onError: (action: ReturnType<typeof TagsActions.createTag>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  addSermonTags$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(TagsActions.createSermonTags, {
      run: (
        action: ReturnType<typeof TagsActions.createSermonTags>,
        state: fromTags.TagsPartialState
      ) => {
        return this.tagsService.createSermonTags(action.objects).pipe(
          map((tag: Tag) => TagsActions.sermonTagsCreated({ tag }))
        );
      },
      onError: (action: ReturnType<typeof TagsActions.createSermonTags>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  updateTag$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(TagsActions.updateTag, {
      run: (
        action: ReturnType<typeof TagsActions.updateTag>,
        state: fromTags.TagsPartialState
      ) => {
        return this.tagsService.update(action.tag).pipe(
          map((tag: Tag) => TagsActions.tagUpdated({ tag }))
        );
      },
      onError: (action: ReturnType<typeof TagsActions.updateTag>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  updateTagBySermonId$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(TagsActions.updateTagBySermonId, {
      run: (
        action: ReturnType<typeof TagsActions.updateTagBySermonId>,
        state: fromTags.TagsPartialState
      ) => {
        return this.tagsService.updateBySermonId(action.sermonId, action.tag).pipe(
          map((tag: Tag) => TagsActions.tagBySermonIdUpdated({ tag }))
        );
      },
      onError: (action: ReturnType<typeof TagsActions.updateTagBySermonId>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  deleteSermonTag$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(TagsActions.deleteSermonTags, {
      run: (
        action: ReturnType<typeof TagsActions.deleteSermonTags>,
        state: fromTags.TagsPartialState
      ) => {
        return this.tagsService.deleteSermonTag(action.sermonId).pipe(
          map((tags: Tag[]) => TagsActions.sermonTagsDeleted({ tags }))
        );
      },
      onError: (action: ReturnType<typeof TagsActions.deleteSermonTags>, error) => {
        this.notifyService.openSnackBar(error.message);
      }
    })
  );

  deleteTag$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(TagsActions.deleteTag, {
      run: (
        action: ReturnType<typeof TagsActions.deleteTag>,
        state: fromTags.TagsPartialState
      ) => {
        return this.dialogService.deleteDialog(action.tag, 'tag').pipe(
          switchMap((deleteConfirmed: boolean) =>
            iif(() => deleteConfirmed,
              this.tagsService.delete(action.tag).pipe(
                map((tag: Tag) => TagsActions.tagDeleted({ tag }))
              ),
              EMPTY
            )
          )
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
