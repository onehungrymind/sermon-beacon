import { Injectable } from '@angular/core';

import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as fromTags from './tags.reducer';
import * as TagsActions from './tags.actions';
import { TagsService, Tag } from '@sb/core-data';

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
        console.error('Error', error);
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
        console.error('Error', error);
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
        console.error('Error', error);
      }
    })
  );

  deleteTag$ = createEffect(() =>
    this.dataPersistence.fetch(TagsActions.deleteTag, {
      run: (
        action: ReturnType<typeof TagsActions.deleteTag>,
        state: fromTags.TagsPartialState
      ) => {
        return this.tagsService.delete(action.tag).pipe(map((_: Tag) => TagsActions.deleteTagSuccess({ tag: action.tag })));
      },

      onError: (action: ReturnType<typeof TagsActions.deleteTag>, error) => {
        console.error('Error', error);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<fromTags.TagsPartialState>,
    private tagsService: TagsService
  ) {}
}
