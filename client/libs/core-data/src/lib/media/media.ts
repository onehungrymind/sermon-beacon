export interface Media {
  id: string;
  url: string;
  embedCode: string;
  created_at: string;
  updated_at: string;
  type: string;
  sermon_id: string;
}

export const emptyMedia = {
  id: '',
  url: '',
  embedCode: '',
  created_at: '',
  updated_at: '',
  type: '',
  sermon_id: ''
}
