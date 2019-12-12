import { MediaTypesEntity } from './media-types.models';
import * as MediaTypesActions from '../media-types.actions';
import { State, initialState, reducer } from '../media-types.reducer';

describe('MediaTypes Reducer', () => {
  const createMediaTypesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as MediaTypesEntity);

  beforeEach(() => {});

  describe('valid MediaTypes actions', () => {
    it('loadMediaTypesSuccess should return set the list of known MediaTypes', () => {
      const mediaTypes = [
        createMediaTypesEntity('PRODUCT-AAA'),
        createMediaTypesEntity('PRODUCT-zzz')
      ];
      const action = MediaTypesActions.loadMediaTypesSuccess({ mediaTypes });

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
