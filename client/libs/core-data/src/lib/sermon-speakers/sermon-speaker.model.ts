import { emptySpeaker, Speaker } from '../speakers/speaker.model';

export interface SermonSpeaker extends Speaker {
  sermon_id: string;
}

export const emptySermonSpeaker: SermonSpeaker = {
  ...emptySpeaker,
  sermon_id: null
};
