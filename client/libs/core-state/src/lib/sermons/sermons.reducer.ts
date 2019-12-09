import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as SermonsActions from './sermons.actions';
import { SermonsEntity } from './sermons.models';

export const SERMONS_FEATURE_KEY = 'sermons';

export interface SermonsState extends EntityState<SermonsEntity> {
  selectedId?: string | number; // which Sermons record has been selected
  loaded: boolean; // has the Sermons list been loaded
  error?: string | null; // last none error (if any)
}

export interface SermonsPartialState {
  readonly [SERMONS_FEATURE_KEY]: SermonsState;
}

export const sermonsAdapter: EntityAdapter<SermonsEntity> = createEntityAdapter<
  SermonsEntity
>();

export const initialState: SermonsState = sermonsAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const sermonsReducer = createReducer(
  initialState,
  on(SermonsActions.loadSermons, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(SermonsActions.loadSermonsSuccess, (state, { sermons }) =>
    sermonsAdapter.addAll(sermons, { ...state, loaded: true })
  ),
  on(SermonsActions.loadSermonsFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function reducer(state: SermonsState | undefined, action: Action) {
  return sermonsReducer(state, action);
}
