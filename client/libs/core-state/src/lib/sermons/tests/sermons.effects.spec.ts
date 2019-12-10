import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { SermonsEffects } from '../sermons.effects';
import * as SermonsActions from '../sermons.actions';

describe('SermonsEffects', () => {
  let actions: Observable<any>;
  let effects: SermonsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        SermonsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.get(SermonsEffects);
  });

  describe('loadSermons$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: SermonsActions.loadSermons() });

      const expected = hot('-a-|', {
        a: SermonsActions.loadSermonsSuccess({ sermons: [] })
      });

      expect(effects.loadSermons$).toBeObservable(expected);
    });
  });
});
