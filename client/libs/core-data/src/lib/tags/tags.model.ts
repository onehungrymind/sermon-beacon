import { Sermon } from '../sermons/sermons.model';

export interface Tag {
  id: string;
  property: string;
  value: string;
  created_at: string;
  updated_at: string;
  sermon_tags?: SermonTag[];
}

interface SermonTag {
  id?: string;
  tag_id?: string;
  sermon_id?: string;
  sermon?: Sermon;
  tag?: Tag;
}

export const emptyTag: Tag = {
  id: null,
  property: '',
  value: '',
  created_at: '',
  updated_at: '',
  sermon_tags: []
}
