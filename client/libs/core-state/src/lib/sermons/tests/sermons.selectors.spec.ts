import { SermonsEntity } from './sermons.models';
import { SermonsState, sermonsAdapter, initialState } from '../sermons.reducer';
import * as SermonsSelectors from '../sermons.selectors';

describe('Sermons Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getSermonsId = it => it['id'];
  const createSermonsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as SermonsEntity);

  let state;

  beforeEach(() => {
    state = {
      sermons: sermonsAdapter.addAll(
        [
          createSermonsEntity('PRODUCT-AAA'),
          createSermonsEntity('PRODUCT-BBB'),
          createSermonsEntity('PRODUCT-CCC')
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('Sermons Selectors', () => {
    it('getAllSermons() should return the list of Sermons', () => {
      const results = SermonsSelectors.getAllSermons(state);
      const selId = getSermonsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = SermonsSelectors.getSelected(state);
      const selId = getSermonsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getSermonsLoaded() should return the current 'loaded' status", () => {
      const result = SermonsSelectors.getSermonsLoaded(state);

      expect(result).toBe(true);
    });

    it("getSermonsError() should return the current 'error' state", () => {
      const result = SermonsSelectors.getSermonsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
