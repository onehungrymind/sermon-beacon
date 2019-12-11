import { Media } from '../media/media.model';

export interface MediaType {
  name: string;
  description: string;
  media?: Media[];
}

export const emptyMediaType = {
  name: '',
  description: '',
  media: []
}
