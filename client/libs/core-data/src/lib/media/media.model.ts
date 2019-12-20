import { Base } from '../base.model';
import { Sermon } from '../sermons/sermon.model';
import { MediaTypes } from '../media-types/media-type.model';

export interface Media extends Base {
  sermon_id: string;
  type: MediaTypes;
  embedCode?: string | any;
  url?: string;
  sermon?: Sermon;
}

export const emptyMedia = {
  id: '',
  url: '',
  embedCode: '',
  created_at: '',
  updated_at: '',
  type: '',
  sermon_id: '',
  sermon: {}
};
