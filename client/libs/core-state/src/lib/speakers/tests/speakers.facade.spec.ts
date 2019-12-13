import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { SpeakersEffects } from '../speakers.effects';
import { SpeakersFacade } from '../speakers.facade';

import * as SpeakersSelectors from '../speakers.selectors';
import * as SpeakersActions from '../speakers.actions';
import {
  initialState,
  reducer,
  SPEAKERS_FEATURE_KEY,
  SpeakersState
} from '../speakers.reducer';

interface TestSchema {
  speakers: SpeakersState;
}

describe('SpeakersFacade', () => {
  let facade: SpeakersFacade;
  let store: Store<TestSchema>;
  const createSpeakersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as SpeakersEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(SPEAKERS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([SpeakersEffects])
        ],
        providers: [SpeakersFacade]
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
      facade = TestBed.get(SpeakersFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allSpeakers$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.loadAll();

        list = await readFirst(facade.allSpeakers$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadSpeakersSuccess` to manually update list
     */
    it('allSpeakers$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allSpeakers$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          SpeakersActions.loadSpeakersSuccess({
            speakers: [createSpeakersEntity('AAA'), createSpeakersEntity('BBB')]
          })
        );

        list = await readFirst(facade.allSpeakers$);
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
