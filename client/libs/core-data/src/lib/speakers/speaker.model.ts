import { Base } from '../base.model';
import { Sermon } from '../sermons/sermon.model';

export interface Speaker extends Base {
  name: string;
  church_name?: string;
  sermon_id: string;
  position?: string;
  speaker_sermons?: Sermon[];
  speaker?: Speaker;
}

export const emptySpeaker: Speaker = {
  id: null,
  church_name: '',
  created_at: '',
  name: '',
  sermon_id: null,
  position: '',
  speaker_sermons: [],
  updated_at: ''
};
