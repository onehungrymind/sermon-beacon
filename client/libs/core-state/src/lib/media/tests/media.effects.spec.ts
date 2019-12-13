import { async, TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { MediaEffects } from '../media.effects';
import * as MediaActions from '../media.actions';

describe('MediaEffects', () => {
  let actions: Observable<any>;
  let effects: MediaEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        MediaEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.get(MediaEffects);
  });

  describe('loadMedia$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: MediaActions.loadMedia() });

      const expected = hot('-a-|', {
        a: MediaActions.loadMediaSuccess({ media: [] })
      });

      expect(effects.loadMedia$).toBeObservable(expected);
    });
  });
});
