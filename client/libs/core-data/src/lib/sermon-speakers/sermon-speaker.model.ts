import { emptySermon, Sermon } from '../sermons/sermon.model';

export interface SermonSpeaker {
  id: string;
  sermon: Sermon;
}

export const emptySermonSpeaker: SermonSpeaker = {
  id: null,
  sermon: {
    ...emptySermon
  }
};
