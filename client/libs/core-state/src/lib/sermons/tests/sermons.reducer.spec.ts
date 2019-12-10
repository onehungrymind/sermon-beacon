import { SermonsEntity } from './sermons.models';
import * as SermonsActions from '../sermons.actions';
import { SermonsState, initialState, reducer } from '../sermons.reducer';

describe('Sermons Reducer', () => {
  const createSermonsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as SermonsEntity);

  beforeEach(() => {});

  describe('valid Sermons actions', () => {
    it('loadSermonsSuccess should return set the list of known Sermons', () => {
      const sermons = [
        createSermonsEntity('PRODUCT-AAA'),
        createSermonsEntity('PRODUCT-zzz')
      ];
      const action = SermonsActions.loadSermonsSuccess({ sermons });

      const result: SermonsState = reducer(initialState, action);

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
