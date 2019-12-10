import { ActionReducerMap } from '@ngrx/store';

import * as fromSermons from './sermons/sermons.reducer';


export interface AppState {
  sermons: fromSermons.State;
}

export const reducers: ActionReducerMap<AppState> = {
  sermons: fromSermons.reducer,
}