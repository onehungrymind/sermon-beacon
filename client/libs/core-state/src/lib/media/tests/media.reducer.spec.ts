import * as MediaActions from '../media.actions';
import { State, initialState, reducer } from '../media.reducer';

describe('Media Reducer', () => {
  const createMediaEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as MediaEntity);

  beforeEach(() => {});

  describe('valid Media actions', () => {
    it('loadMediaSuccess should return set the list of known Media', () => {
      const media = [
        createMediaEntity('PRODUCT-AAA'),
        createMediaEntity('PRODUCT-zzz')
      ];
      const action = MediaActions.loadMediaSuccess({ media });

      const result: State = reducer(initialState, action);

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
