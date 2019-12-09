export interface Tags {
  id: string;
  property: string;
  value: string;
  created_at: string;
  updated_at: string;
}

export const emptyTags: Tags = {
  id: '',
  property: '',
  value: '',
  created_at: '',
  updated_at: ''
}