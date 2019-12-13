import { async, TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { TagsEffects } from '../tags.effects';
import * as TagsActions from '../tags.actions';

describe('TagsEffects', () => {
  let actions: Observable<any>;
  let effects: TagsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        TagsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.get(TagsEffects);
  });

  describe('loadTags$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: TagsActions.loadTags() });

      const expected = hot('-a-|', {
        a: TagsActions.loadTagsSuccess({ tags: [] })
      });

      expect(effects.loadTags$).toBeObservable(expected);
    });
  });
});
