import gql from 'graphql-tag';
import { sermonFragment } from '../sermons/sermons.graphql';
import { speakersFragment } from '../speakers/speakers.graphql';

export const sermonSpeakerFragment = gql`
  fragment sermonSpeakerFragment on speaker_sermons {
    id
    sermon {
      ...sermonFragment
      sermon_speakers {
        speaker {
          ...speakersFragment
        }
      }
    }
  }
  ${sermonFragment}
  ${speakersFragment}
`;

export const sermonSpeakersQuery = gql`
  query sermonSpeakersQuery {
    speaker_sermons(distinct_on: sermon_id) {
      ...sermonSpeakerFragment
    }
  }
  ${sermonSpeakerFragment}
`;
