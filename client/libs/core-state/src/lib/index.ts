import { ActionReducerMap, createSelector } from '@ngrx/store';

import * as fromMedia from './media/media.reducer';
import * as fromMediaTypes from './media-types/media-types.reducer';
import * as fromSermons from './sermons/sermons.reducer';
import * as fromSermonSpeakers from './sermon-speakers/sermon-speakers.reducer';
import * as fromSpeakers from './speakers/speakers.reducer';
import * as fromTags from './tags/tags.reducer';
import { Media, Sermon, Speaker, Tag } from '@sb/core-data';
import { selectAllMedia } from './media/media.selectors';
import { selectAllSermons, selectSermon } from './sermons/sermons.selectors';
import { selectAllSermonSpeakers } from './sermon-speakers/sermon-speakers.selectors';
import { selectedSpeakers } from './speakers/speakers.selectors';
import { selectedTags } from './tags/tags.selectors';

export interface AppState {
  media: fromMedia.MediaState;
  mediaTypes: fromMediaTypes.MediaTypeState;
  sermons: fromSermons.SermonsState;
  sermon_speakers: fromSermonSpeakers.SermonSpeakersState;
  speakers: fromSpeakers.SpeakersState;
  tags: fromTags.TagsState;
}

export const reducers: ActionReducerMap<AppState> = {
  media: fromMedia.reducer,
  mediaTypes: fromMediaTypes.reducer,
  sermons: fromSermons.reducer,
  sermon_speakers: fromSermonSpeakers.reducer,
  speakers: fromSpeakers.reducer,
  tags: fromTags.reducer
};

//---------------------------------------
// Aggregated Data
//---------------------------------------

const buildAggregatedSermon = (sermon: Sermon, media: Media[], speakers: Speaker[], tags: Tag[]) => {
  return sermon && ({
    ...sermon,
    sermon_media: media.filter((m) => m.sermon_id === sermon.id),
    sermon_speakers: speakers,
    sermon_tags: tags
  });
};

export const selectAggregatedSermon = createSelector(
  selectSermon,
  selectAllMedia,
  selectedSpeakers,
  selectedTags,
  buildAggregatedSermon
);
