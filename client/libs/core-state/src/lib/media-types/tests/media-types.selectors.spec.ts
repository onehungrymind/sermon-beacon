import { MediaTypesEntity } from './media-types.models';
import { State, mediaTypesAdapter, initialState } from '../media-types.reducer';
import * as MediaTypesSelectors from '../media-types.selectors';

describe('MediaTypes Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getMediaTypesId = (it) => it['id'];
  const createMediaTypesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as MediaTypesEntity);

  let state;

  beforeEach(() => {
    state = {
      mediaTypes: mediaTypesAdapter.addAll(
        [
          createMediaTypesEntity('PRODUCT-AAA'),
          createMediaTypesEntity('PRODUCT-BBB'),
          createMediaTypesEntity('PRODUCT-CCC')
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

  describe('MediaTypes Selectors', () => {
    it('getAllMediaTypes() should return the list of MediaTypes', () => {
      const results = MediaTypesSelectors.getAllMediaTypes(state);
      const selId = getMediaTypesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = MediaTypesSelectors.getSelected(state);
      const selId = getMediaTypesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getMediaTypesLoaded() should return the current 'loaded' status", () => {
      const result = MediaTypesSelectors.getMediaTypesLoaded(state);

      expect(result).toBe(true);
    });

    it("getMediaTypesError() should return the current 'error' state", () => {
      const result = MediaTypesSelectors.getMediaTypesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
