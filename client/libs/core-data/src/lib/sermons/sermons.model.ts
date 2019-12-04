export interface Sermon {
  id: string;
  title: string;
  subject?: string;
  date?: string;
  created_at: string;
  updated_at: string;
  media_id: number;
}

export const emptySermon: Sermon = {
  id: null,
  title: '',
  subject: '',
  date: '',
  created_at: '',
  updated_at: '',
  media_id: null,
}