import { ActionReducerMap } from '@ngrx/store';

import * as fromSermons from './sermons/sermons.reducer';
import * as fromSpeakers from './speakers/speakers.reducer';

export interface AppState {
  sermons: fromSermons.State;
  speakers: fromSpeakers.SpeakersState
}

export const reducers: ActionReducerMap<AppState> = {
  sermons: fromSermons.reducer,
  speakers: fromSpeakers.reducer
}