export interface Speaker {
  church_name: string;
  created_at: string;
  first_name: string;
  id: string;
  last_name: string;
  position: string;
  updated_at: string;
}

export const emptySpeaker: Speaker = {
  id: null,
  church_name: '',
  created_at: '',
  first_name: '',
  last_name: '',
  position: '',
  updated_at: ''
}