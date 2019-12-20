import gql from 'graphql-tag';

export const speakersFragment = gql`
  fragment speakersFragment on speakers {
    id
    first_name
    last_name
    position
    church_name
    created_at
    updated_at
  }
`;

export const sermonSpeakerFragment = gql`
  fragment sermonSpeakerFragment on sermon_speakers_view {
    id
    first_name
    last_name
    position
    church_name
    sermon_id
    created_at
    updated_at
  }
`;

export const speakerQuery = gql`
  query speakerQuery {
    speakers {
      ...speakersFragment
    }
  }
  ${speakersFragment}
`;

export const sermonSpeakersQuery = gql`
  query speakerQuery {
    sermon_speakers_view {
      ...sermonSpeakerFragment
    }
  }
  ${sermonSpeakerFragment}
`;

export const speakerBySermonIdQuery = gql`
  query speakerBySermonIdQuery($id: uuid) {
    sermon_speakers_view(where: { sermon_id: {_eq: $id}}) {
      ...sermonSpeakerFragment
    }
  }
  ${sermonSpeakerFragment}
`;

export const createSpeakerMutation = gql`
  mutation createSpeakerMutation($objects: [speakers_insert_input!]!) {
    insert_speakers(objects: $objects) {
      returning {
        ...speakersFragment
      }
    }
  }
  ${speakersFragment}
`;

export const updateSpeakerMutation = gql`
  mutation updateSpeakerMutation($id: uuid!, $speaker: speakers_set_input) {
    update_speakers(where: {id: {_eq: $id}}, _set: $speaker) {
      returning {
        ...speakersFragment
      }
    }
  }
  ${speakersFragment}
`;

export const deleteSpeakerMutation = gql`
  mutation deleteSpeakerMutation($id: uuid!) {
    delete_speakers(where: {id: {_eq: $id}}) {
      returning {
        ...speakersFragment
      }
    }
  }
  ${speakersFragment}
`;
