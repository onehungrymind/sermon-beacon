import { Base } from '../base.model';
import { Sermon } from '../sermons/sermon.model';

export interface Media extends Base {
  sermon_id: string;
  type: MediaTypes;
  embedCode?: string;
  url?: string;
  sermon?: Sermon;
}

export enum MediaTypes {
  VIDEO = 'Video',
  AUDIO = 'AUDIO',
  PDF = 'PDF'
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
