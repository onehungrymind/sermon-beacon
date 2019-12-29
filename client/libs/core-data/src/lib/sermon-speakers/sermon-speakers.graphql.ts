import gql from 'graphql-tag';

export const sermonSpeakerFragment = gql`
  fragment sermonSpeakerFragment on sermon_speakers_view {
    id
    name
    position
    church_name
    sermon_id
    created_at
    updated_at
  }
`;

export const sermonSpeakersQuery = gql`
  query sermonSpeakersQuery {
    sermon_speakers_view {
      ...sermonSpeakerFragment
    }
  }
  ${sermonSpeakerFragment}
`;
