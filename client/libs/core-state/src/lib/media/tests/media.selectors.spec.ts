import { MediaEntity } from './media.models';
import { initialState, mediaAdapter, State } from '../media.reducer';
import * as MediaSelectors from '../media.selectors';

describe('Media Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getMediaId = (it) => it['id'];
  const createMediaEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as MediaEntity);

  let state;

  beforeEach(() => {
    state = {
      media: mediaAdapter.addAll(
        [
          createMediaEntity('PRODUCT-AAA'),
          createMediaEntity('PRODUCT-BBB'),
          createMediaEntity('PRODUCT-CCC')
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

  describe('Media Selectors', () => {
    it('getAllMedia() should return the list of Media', () => {
      const results = MediaSelectors.getAllMedia(state);
      const selId = getMediaId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = MediaSelectors.getSelected(state);
      const selId = getMediaId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getMediaLoaded() should return the current 'loaded' status", () => {
      const result = MediaSelectors.getMediaLoaded(state);

      expect(result).toBe(true);
    });

    it("getMediaError() should return the current 'error' state", () => {
      const result = MediaSelectors.getMediaError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
