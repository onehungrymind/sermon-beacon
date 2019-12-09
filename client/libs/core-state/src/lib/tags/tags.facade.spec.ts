import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { TagsEntity } from './tags.models';
import { TagsEffects } from './tags.effects';
import { TagsFacade } from './tags.facade';

import * as TagsSelectors from './tags.selectors';
import * as TagsActions from './tags.actions';
import {
  TAGS_FEATURE_KEY,
  TagsState,
  initialState,
  reducer
} from './tags.reducer';

interface TestSchema {
  tags: TagsState;
}

describe('TagsFacade', () => {
  let facade: TagsFacade;
  let store: Store<TestSchema>;
  const createTagsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as TagsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(TAGS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([TagsEffects])
        ],
        providers: [TagsFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(TagsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allTags$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.loadAll();

        list = await readFirst(facade.allTags$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadTagsSuccess` to manually update list
     */
    it('allTags$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allTags$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          TagsActions.loadTagsSuccess({
            tags: [createTagsEntity('AAA'), createTagsEntity('BBB')]
          })
        );

        list = await readFirst(facade.allTags$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
