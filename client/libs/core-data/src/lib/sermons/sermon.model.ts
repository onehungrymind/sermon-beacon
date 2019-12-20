import { Base } from '../base.model';
import { Speaker } from '../speakers/speaker.model';
import { Tag } from '../tags/tag.model';

export interface Sermon extends Base {
  title: string;
  subject?: string;
  date?: string;
  media_id: string;
  speaker_id?: string;
  tag_id?: string;
  sermon_speakers?: Speaker[];
  sermon_tags?: Tag[];
}

export const emptySermon: Sermon = {
  id: null,
  title: '',
  subject: '',
  date: '',
  media_id: null,
  speaker_id: null,
  tag_id: null,
  created_at: '',
  updated_at: '',
  sermon_speakers: [],
  sermon_tags: []
};
