import { ActionReducerMap } from '@ngrx/store';

import * as fromMedia from './media/media.reducer';
import * as fromMediaTypes from './media-types/media-types.reducer';
import * as fromSermons from './sermons/sermons.reducer';
import * as fromSermonSpeakers from './sermon-speakers/sermon-speakers.reducer';
import * as fromSpeakers from './speakers/speakers.reducer';
import * as fromTags from './tags/tags.reducer';

export interface AppState {
  media: fromMedia.MediaState;
  mediaTypes: fromMediaTypes.MediaTypeState;
  sermons: fromSermons.SermonsState;
  sermonSpeakers: fromSermonSpeakers.SermonSpeakersState;
  speakers: fromSpeakers.SpeakersState;
  tags: fromTags.TagsState;
}

export const reducers: ActionReducerMap<AppState> = {
  media: fromMedia.reducer,
  mediaTypes: fromMediaTypes.reducer,
  sermons: fromSermons.reducer,
  sermonSpeakers: fromSermonSpeakers.reducer,
  speakers: fromSpeakers.reducer,
  tags: fromTags.reducer
};
