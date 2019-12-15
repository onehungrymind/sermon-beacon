import { ActionReducerMap } from '@ngrx/store';

import * as fromSermons from './sermons/sermons.reducer';
import * as fromSpeakers from './speakers/speakers.reducer';
import * as fromTags from './tags/tags.reducer';
import * as fromMedia from './media/media.reducer';
import * as fromMediaTypes from './media-types/media-types.reducer';

export interface AppState {
  media: fromMedia.MediaState;
  mediaTypes: fromMediaTypes.MediaTypeState;
  sermons: fromSermons.SermonsState;
  speakers: fromSpeakers.SpeakersState;
  tags: fromTags.TagsState;
}

export const reducers: ActionReducerMap<AppState> = {
  media: fromMedia.reducer,
  mediaTypes: fromMediaTypes.reducer,
  sermons: fromSermons.reducer,
  speakers: fromSpeakers.reducer,
  tags: fromTags.reducer
};
