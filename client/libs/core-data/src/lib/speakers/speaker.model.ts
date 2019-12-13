import { Base } from '../base.model';
import { Sermon } from '../sermons/sermon.model';

export interface Speaker extends Base {
  first_name: string;
  last_name: string;
  church_name?: string;
  speaker_sermons?: SpeakerSermon[];
  position?: string;
}

export interface SpeakerSermon {
  id?: string;
  sermon?: Sermon;
  sermon_id?: string;
  speaker?: Speaker;
  speaker_id?: string;
}

export const emptySpeaker: Speaker = {
  id: null,
  church_name: '',
  created_at: '',
  first_name: '',
  last_name: '',
  position: '',
  updated_at: '',
  speaker_sermons: []
};
