import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SERMONS_FEATURE_KEY,
  SermonsState,
  SermonsPartialState,
  sermonsAdapter
} from './sermons.reducer';

// Lookup the 'Sermons' feature state managed by NgRx
export const getSermonsState = createFeatureSelector<
  SermonsPartialState,
  SermonsState
>(SERMONS_FEATURE_KEY);

const { selectAll, selectEntities } = sermonsAdapter.getSelectors();

export const getSermonsLoaded = createSelector(
  getSermonsState,
  (state: SermonsState) => state.loaded
);

export const getSermonsError = createSelector(
  getSermonsState,
  (state: SermonsState) => state.error
);

export const getAllSermons = createSelector(
  getSermonsState,
  (state: SermonsState) => selectAll(state)
);

export const getSermonsEntities = createSelector(
  getSermonsState,
  (state: SermonsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getSermonsState,
  (state: SermonsState) => state.selectedId
);

export const getSelected = createSelector(
  getSermonsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
