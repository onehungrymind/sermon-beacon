import { Base } from '../base.model';
import { Sermon } from '../sermons/sermon.model';

export interface Tag extends Base {
  value: string;
  property?: string;
  sermon_tags?: SermonTag[];
}

export interface SermonTag {
  id?: string;
  sermon?: Sermon;
  sermon_id?: string;
  tag?: Tag;
  tag_id?: string;
}

export const emptyTag: Tag = {
  id: null,
  property: '',
  value: '',
  created_at: '',
  updated_at: '',
  sermon_tags: []
}
