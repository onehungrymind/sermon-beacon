import { Base } from '../base.model';
import { Sermon } from '../sermons/sermon.model';

export interface Speaker extends Base {
  name: string;
  church_name?: string;
  sermon_id: string;
  position?: string;
  speaker_sermons?: Sermon[];
}

export const emptySpeaker: Speaker = {
  id: null,
  church_name: '',
  created_at: '',
  name: '',
  position: '',
  speaker_sermons: [],
  created_at: '',
  updated_at: ''
};
