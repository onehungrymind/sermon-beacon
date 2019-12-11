import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { MediaTypesEffects } from '../media-types.effects';
import * as MediaTypesActions from '../media-types.actions';

describe('MediaTypesEffects', () => {
  let actions: Observable<any>;
  let effects: MediaTypesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        MediaTypesEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.get(MediaTypesEffects);
  });

  describe('loadMediaTypes$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: MediaTypesActions.loadMediaTypes() });

      const expected = hot('-a-|', {
        a: MediaTypesActions.loadMediaTypesSuccess({ mediaTypes: [] })
      });

      expect(effects.loadMediaTypes$).toBeObservable(expected);
    });
  });
});
