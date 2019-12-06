import gql from 'graphql-tag';

export const speakerFragment = gql`
  fragment speakersFragment on speakers {
    church_name
    created_at
    first_name
    id
    last_name
    position
    updated_at
  }
`;

export const speakerQuery = gql`
  query speakerQuery {
    speakers {
      ...speakerFragment
    }
  }
  ${speakerFragment}
`;

export const createSpeakerMutation = gql`
  mutation createSpeakerMutation($objects: [speakers_insert_input!]!) {
    insert_speakers(objects: $objects) {
      returning {
        ...speakerFragment
      }
    }
  }
  ${speakerFragment}
`;

export const updateSpeakerMutation = gql`
  mutation updateSpeakerMutation($id: uuid!, $speaker: speaker_set_input) {
    update_speakers(where: {id: {_eq: $id}}, _set: $sermon) {
      returning {
        ...speakerFragment
      }
    }
  }
  ${speakerFragment}
`;

export const deleteSpeakerMutation = gql`
  mutation deleteSpeakerMutation($id: uuid!) {
    delete_speakers(where: {id: {_eq: $id}}) {
      returning {
        ...speakerFragment
      }
    }
  }
  ${speakerFragment}
`;