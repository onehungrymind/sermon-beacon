import * as SpeakersActions from '../speakers.actions';
import { SpeakersState, initialState, reducer } from '../speakers.reducer';

describe('Speakers Reducer', () => {
  const createSpeakersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as SpeakersEntity);

  beforeEach(() => {});

  describe('valid Speakers actions', () => {
    it('loadSpeakersSuccess should return set the list of known Speakers', () => {
      const speakers = [
        createSpeakersEntity('PRODUCT-AAA'),
        createSpeakersEntity('PRODUCT-zzz')
      ];
      const action = SpeakersActions.loadSpeakersSuccess({ speakers });

      const result: SpeakersState = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
