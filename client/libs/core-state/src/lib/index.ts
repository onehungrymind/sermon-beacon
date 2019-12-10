import { ActionReducerMap } from '@ngrx/store';

import * as fromSermons from './sermons/sermons.reducer';
import * as fromSpeakers from './speakers/speakers.reducer';
import * as fromTags from './tags/tags.reducer';
import * as fromMedia from './media/media.reducer';

export interface AppState {
  sermons: fromSermons.State;
  speakers: fromSpeakers.SpeakersState;
  tags: fromTags.TagsState;
  media: fromMedia.MediaState;
}

export const reducers: ActionReducerMap<AppState> = {
  sermons: fromSermons.reducer,
  speakers: fromSpeakers.reducer,
  tags: fromTags.reducer,
  media: fromMedia.reducer
}
