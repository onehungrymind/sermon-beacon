import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { MediaTypesEntity } from './media-types.models';
import { MediaTypesEffects } from '../media-types.effects';
import { MediaTypesFacade } from '../media-types.facade';

import * as MediaTypesSelectors from '../media-types.selectors';
import * as MediaTypesActions from '../media-types.actions';
import {
  MEDIATYPES_FEATURE_KEY,
  State,
  initialState,
  reducer
} from '../media-types.reducer';

interface TestSchema {
  mediaTypes: State;
}

describe('MediaTypesFacade', () => {
  let facade: MediaTypesFacade;
  let store: Store<TestSchema>;
  const createMediaTypesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as MediaTypesEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(MEDIATYPES_FEATURE_KEY, reducer),
          EffectsModule.forFeature([MediaTypesEffects])
        ],
        providers: [MediaTypesFacade]
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
      facade = TestBed.get(MediaTypesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allMediaTypes$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(MediaTypesActions.loadMediaTypes());

        list = await readFirst(facade.allMediaTypes$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadMediaTypesSuccess` to manually update list
     */
    it('allMediaTypes$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allMediaTypes$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          MediaTypesActions.loadMediaTypesSuccess({
            mediaTypes: [
              createMediaTypesEntity('AAA'),
              createMediaTypesEntity('BBB')
            ]
          })
        );

        list = await readFirst(facade.allMediaTypes$);
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
