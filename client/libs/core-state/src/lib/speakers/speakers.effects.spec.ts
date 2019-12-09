import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { SpeakersEffects } from './speakers.effects';
import * as SpeakersActions from './speakers.actions';

describe('SpeakersEffects', () => {
  let actions: Observable<any>;
  let effects: SpeakersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        SpeakersEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.get(SpeakersEffects);
  });

  describe('loadSpeakers$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: SpeakersActions.loadSpeakers() });

      const expected = hot('-a-|', {
        a: SpeakersActions.loadSpeakersSuccess({ speakers: [] })
      });

      expect(effects.loadSpeakers$).toBeObservable(expected);
    });
  });
});
