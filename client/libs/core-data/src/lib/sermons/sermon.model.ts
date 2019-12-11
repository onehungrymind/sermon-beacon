import { Base } from '../base.model';
import { SermonTag } from '../tags/tag.model';
import { SpeakerSermon } from '../speakers/speaker.model';

export interface Sermon extends Base {
  media_id: string;
  title: string;
  date?: string;
  sermon_speakers?: SpeakerSermon[];
  sermon_tags?: SermonTag[];
  subject?: string;
}

export const emptySermon: Sermon = {
  id: null,
  title: '',
  subject: '',
  date: '',
  media_id: null,
  created_at: '',
  updated_at: '',
  sermon_speakers: [],
  sermon_tags: []
}
