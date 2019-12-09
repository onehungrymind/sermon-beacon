import { SpeakersEntity } from './speakers.models';
import {
  SpeakersState,
  speakersAdapter,
  initialState
} from './speakers.reducer';
import * as SpeakersSelectors from './speakers.selectors';

describe('Speakers Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getSpeakersId = it => it['id'];
  const createSpeakersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as SpeakersEntity);

  let state;

  beforeEach(() => {
    state = {
      speakers: speakersAdapter.addAll(
        [
          createSpeakersEntity('PRODUCT-AAA'),
          createSpeakersEntity('PRODUCT-BBB'),
          createSpeakersEntity('PRODUCT-CCC')
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

  describe('Speakers Selectors', () => {
    it('getAllSpeakers() should return the list of Speakers', () => {
      const results = SpeakersSelectors.getAllSpeakers(state);
      const selId = getSpeakersId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = SpeakersSelectors.getSelected(state);
      const selId = getSpeakersId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getSpeakersLoaded() should return the current 'loaded' status", () => {
      const result = SpeakersSelectors.getSpeakersLoaded(state);

      expect(result).toBe(true);
    });

    it("getSpeakersError() should return the current 'error' state", () => {
      const result = SpeakersSelectors.getSpeakersError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
