import { Sermon } from '../sermons/sermons.model';

export interface Speaker {
  id: string;
  first_name: string;
  last_name: string;
  position?: string;
  church_name?: string;
  created_at?: string;
  updated_at?: string;
  speaker_sermons?: SpeakerSermon[];
}

export interface SpeakerSermon {
  id?: string;
  speaker_id?: string;
  sermon_id?: string;
  sermon: Sermon;
  speaker: Speaker;
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
}
