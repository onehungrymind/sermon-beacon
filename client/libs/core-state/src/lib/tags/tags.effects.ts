import { Injectable } from '@angular/core';
import { createEffect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import { TagsPartialState } from './tags.reducer';
import * as TagsActions from './tags.actions';

@Injectable()
export class TagsEffects {
  loadTags$ = createEffect(() =>
    this.dataPersistence.fetch(TagsActions.loadTags, {
      run: (
        action: ReturnType<typeof TagsActions.loadTags>,
        state: TagsPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return TagsActions.loadTagsSuccess({ tags: [] });
      },

      onError: (action: ReturnType<typeof TagsActions.loadTags>, error) => {
        console.error('Error', error);
        return TagsActions.loadTagsFailure({ error });
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<TagsPartialState>
  ) {}
}
