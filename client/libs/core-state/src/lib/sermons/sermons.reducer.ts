import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as SermonsActions from './sermons.actions';
import { Sermon } from '@sb/core-data';

export const SERMONS_FEATURE_KEY = 'sermons';

export interface SermonsState extends EntityState<Sermon> {
  selectedSermonId?: string | number; // which Sermons record has been selected
  isLoading: boolean; // has the Sermons list been loaded
}

export interface SermonsPartialState {
  readonly [SERMONS_FEATURE_KEY]: SermonsState;
}

export const sermonsAdapter: EntityAdapter<Sermon> = createEntityAdapter<Sermon>();

export const initialState: SermonsState = sermonsAdapter.getInitialState({
  // set initial required properties
  selectedSermonId: null,
  isLoading: false
});

const sermonsReducer = createReducer(
  initialState,
  on(SermonsActions.sermonSelected, (state, { selectedSermonId }) =>
    Object.assign({}, state, { selectedSermonId })
  ),
  on(
    SermonsActions.sermonsLoaded,
    SermonsActions.sermonsSearched
    , (state, { sermons }) =>
    sermonsAdapter.addAll(sermons, { ...state, isLoading: false })
  ),
  on(SermonsActions.sermonCreated, (state, { sermon }) =>
    sermonsAdapter.addOne(sermon, { ...state, isLoading: false })
  ),
  on(SermonsActions.sermonUpdated, (state, { sermon }) =>
    sermonsAdapter.upsertOne(sermon, { ...state, isLoading: false })
  ),
  on(SermonsActions.sermonDeleted, (state, { sermon }) =>
    sermonsAdapter.removeOne(sermon.id, { ...state, isLoading: false })
  ),
  on(SermonsActions.sermonMutationCancelled, (state) => ({
    ...state,
    isLoading: false
  })),
  on(
    SermonsActions.loadSermons,
    SermonsActions.searchSermons,
    SermonsActions.createSermon,
    SermonsActions.updateSermon,
    SermonsActions.deleteSermon,
    (state) => ({
      ...state,
      isLoading: true
    })
  ),
);

export function reducer(state: SermonsState | undefined, action: Action) {
  return sermonsReducer(state, action);
}
