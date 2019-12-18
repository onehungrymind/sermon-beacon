import * as TagsActions from '../tags.actions';
import { initialState, reducer, State } from '../tags.reducer';

describe('Tags Reducer', () => {
  const createTagsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as TagsEntity);

  beforeEach(() => {});

  describe('valid Tags actions', () => {
    it('loadTagsSuccess should return set the list of known Tags', () => {
      const tags = [
        createTagsEntity('PRODUCT-AAA'),
        createTagsEntity('PRODUCT-zzz')
      ];
      const action = TagsActions.loadTagsSuccess({ tags });

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
