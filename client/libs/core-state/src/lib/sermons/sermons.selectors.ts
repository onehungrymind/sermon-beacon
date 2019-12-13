import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  SERMONS_FEATURE_KEY,
  SermonsState,
  SermonsPartialState,
  sermonsAdapter
} from './sermons.reducer';

// Lookup the 'Sermons' feature state managed by NgRx
export const selectSermonsState = createFeatureSelector<
  SermonsPartialState,
  SermonsState
>(SERMONS_FEATURE_KEY);

const { selectAll, selectEntities } = sermonsAdapter.getSelectors();

export const selectSermonsLoading = createSelector(
  selectSermonsState,
  (state: SermonsState) => state.isLoading
);

export const selectAllSermons = createSelector(
  selectSermonsState,
  (state: SermonsState) => selectAll(state)
);

export const selectSermonsEntities = createSelector(
  selectSermonsState,
  (state: SermonsState) => selectEntities(state)
);

export const selectSermonId = createSelector(
  selectSermonsState,
  (state: SermonsState) => state.selectedSermonId
);

export const selectSermon = createSelector(
  selectSermonsEntities,
  selectSermonId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
