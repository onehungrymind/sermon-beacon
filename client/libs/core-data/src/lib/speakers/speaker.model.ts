import { Base } from '../base.model';
import { Sermon } from '../sermons/sermon.model';

export interface Speaker extends Base {
  first_name: string;
  last_name: string;
  church_name?: string;
  sermon_id: string;
  position?: string;
  speaker_sermons?: Sermon[];
}

export const emptySpeaker: Speaker = {
  id: null,
  first_name: '',
  last_name: '',
  church_name: '',
  sermon_id: null,
  position: '',
  speaker_sermons: [],
  created_at: '',
  updated_at: ''
};
