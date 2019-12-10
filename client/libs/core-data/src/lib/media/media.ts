export interface Media {
  id: string;
  url: string;
  embedCode: string;
  created_at: string;
  updated_at: string;
  type: MediaTypes;
  sermon_id: string;
}

export enum MediaTypes {
  VIDEO = 'Video',
  AUDIO = 'AUDIO',
  PDF   = 'PDF'
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
