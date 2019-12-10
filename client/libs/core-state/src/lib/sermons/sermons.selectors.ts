import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SERMONS_FEATURE_KEY,
  State,
  SermonsPartialState,
  sermonsAdapter
} from './sermons.reducer';

// Lookup the 'Sermons' feature state managed by NgRx
export const getSermonsState = createFeatureSelector<
  SermonsPartialState,
  State
>(SERMONS_FEATURE_KEY);

const { selectAll, selectEntities } = sermonsAdapter.getSelectors();

export const getSermonsLoading = createSelector(
  getSermonsState,
  (state: State) => state.isLoading
);

export const getAllSermons = createSelector(
  getSermonsState,
  (state: State) => selectAll(state)
);

export const getSermonsEntities = createSelector(
  getSermonsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getSermonsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getSermonsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
