import { Media } from '../media/media.model';

export interface MediaType {
  name: string;
  description: string;
  media?: Media[];
}

export enum MediaTypes {
  AUDIO = 'AUDIO',
  PDF = 'PDF',
  VIDEO = 'VIDEO'
}

export const emptyMediaType = {
  name: '',
  description: '',
  media: []
};
