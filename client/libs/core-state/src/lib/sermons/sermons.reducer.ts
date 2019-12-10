import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as SermonsActions from './sermons.actions';
import { Sermon } from '@sb/core-data';

export const SERMONS_FEATURE_KEY = 'sermons';

export interface State extends EntityState<Sermon> {
  selectedId?: string | number; // which Sermons record has been selected
  isLoading: boolean; // has the Sermons list been loaded
}

export interface SermonsPartialState {
  readonly [SERMONS_FEATURE_KEY]: State;
}

export const sermonsAdapter: EntityAdapter<Sermon> = createEntityAdapter<Sermon>();

export const initialState: State = sermonsAdapter.getInitialState({
  // set initial required properties
  selected: null,
  isLoading: false
});

const sermonsReducer = createReducer(
  initialState,
  on(SermonsActions.sermonSelected, (state, { sermonId }) => 
    Object.assign({}, state, { sermonId })
  ), 
  on(
    SermonsActions.loadSermons,
    SermonsActions.createSermon,
    SermonsActions.updateSermon,
    SermonsActions.deleteSermon,
    state => ({
    ...state,
    isLoading: true
  })),
  on(SermonsActions.loadSermonsSuccess, (state, { sermons }) =>
    sermonsAdapter.addAll(sermons, { ...state, isLoading: false })
  ),
  on(SermonsActions.createSermonSuccess, (state, { sermon }) => ({
    sermon,
    ...state,
    isLoading: false
  })),
  on(SermonsActions.updateSermonSuccess, (state, { sermon }) => ({
    sermon,
    ...state,
    isLoading: false
  })),
  on(SermonsActions.deleteSermonSuccess, (state, { sermon }) => ({
    sermon,
    ...state,
    isLoading: false
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return sermonsReducer(state, action);
}