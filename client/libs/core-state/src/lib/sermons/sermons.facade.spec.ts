import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { SermonsEntity } from './sermons.models';
import { SermonsEffects } from './sermons.effects';
import { SermonsFacade } from './sermons.facade';

import * as SermonsSelectors from './sermons.selectors';
import * as SermonsActions from './sermons.actions';
import {
  SERMONS_FEATURE_KEY,
  SermonsState,
  initialState,
  reducer
} from './sermons.reducer';

interface TestSchema {
  sermons: SermonsState;
}

describe('SermonsFacade', () => {
  let facade: SermonsFacade;
  let store: Store<TestSchema>;
  const createSermonsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as SermonsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(SERMONS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([SermonsEffects])
        ],
        providers: [SermonsFacade]
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
      facade = TestBed.get(SermonsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allSermons$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.loadAll();

        list = await readFirst(facade.allSermons$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadSermonsSuccess` to manually update list
     */
    it('allSermons$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allSermons$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          SermonsActions.loadSermonsSuccess({
            sermons: [createSermonsEntity('AAA'), createSermonsEntity('BBB')]
          })
        );

        list = await readFirst(facade.allSermons$);
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
