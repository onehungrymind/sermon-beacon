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
  query sermonSpeakersQuery($titleQuery: String_comparison_exp, $speakerNameQuery: String_comparison_exp, $dateQuery: date_comparison_exp) {
    speaker_sermons(
      distinct_on: sermon_id,
      where: {
        sermon: {
          _and: [
            {date: $dateQuery},
            {title: $titleQuery}
          ],
          _or: [
            {sermon_speakers: {speaker: {name: $speakerNameQuery}}}
          ]
        }
      }
    ) {
      ...sermonSpeakerFragment
    }
  }
  ${sermonSpeakerFragment}
`;
