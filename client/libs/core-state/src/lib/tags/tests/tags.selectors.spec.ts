import { TagsEntity } from '../tags.models';
import { initialState, State, tagsAdapter } from '../tags.reducer';
import * as TagsSelectors from '../tags.selectors';

describe('Tags Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getTagsId = (it) => it['id'];
  const createTagsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as TagsEntity);

  let state;

  beforeEach(() => {
    state = {
      tags: tagsAdapter.addAll(
        [
          createTagsEntity('PRODUCT-AAA'),
          createTagsEntity('PRODUCT-BBB'),
          createTagsEntity('PRODUCT-CCC')
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

  describe('Tags Selectors', () => {
    it('getAllTags() should return the list of Tags', () => {
      const results = TagsSelectors.getAllTags(state);
      const selId = getTagsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = TagsSelectors.getSelected(state);
      const selId = getTagsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getTagsLoaded() should return the current 'loaded' status", () => {
      const result = TagsSelectors.getTagsLoaded(state);

      expect(result).toBe(true);
    });

    it("getTagsError() should return the current 'error' state", () => {
      const result = TagsSelectors.getTagsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
