import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { MediaEntity } from '../media.models';
import { MediaEffects } from '../media.effects';
import { MediaFacade } from '../media.facade';

import * as MediaSelectors from '../media.selectors';
import * as MediaActions from '../media.actions';
import {
  MEDIA_FEATURE_KEY,
  State,
  initialState,
  reducer
} from '../media.reducer';

interface TestSchema {
  media: State;
}

describe('MediaFacade', () => {
  let facade: MediaFacade;
  let store: Store<TestSchema>;
  const createMediaEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as MediaEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(MEDIA_FEATURE_KEY, reducer),
          EffectsModule.forFeature([MediaEffects])
        ],
        providers: [MediaFacade]
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
      facade = TestBed.get(MediaFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allMedia$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(MediaActions.loadMedia());

        list = await readFirst(facade.allMedia$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadMediaSuccess` to manually update list
     */
    it('allMedia$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allMedia$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          MediaActions.loadMediaSuccess({
            media: [createMediaEntity('AAA'), createMediaEntity('BBB')]
          })
        );

        list = await readFirst(facade.allMedia$);
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
