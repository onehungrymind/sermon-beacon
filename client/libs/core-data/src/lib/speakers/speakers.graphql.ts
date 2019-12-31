import gql from 'graphql-tag';

export const speakersFragment = gql`
  fragment speakersFragment on speakers {
    id
    name
    position
    church_name
    created_at
    updated_at
  }
`;

export const speakerQuery = gql`
  query speakerQuery {
    speakers(order_by: {created_at: asc}) {
      ...speakersFragment
    }
  }
  ${speakersFragment}
`;

export const speakerBySermonIdQuery = gql`
  query speakerBySermonIdQuery($id: uuid) {
    speakers(order_by: {created_at: asc}, where: {speaker_sermons: {sermon_id: {_eq: $id}}}) {
      ...speakersFragment
    }
  }
  ${speakersFragment}
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

export const createSermonSpeakerMutation = gql`
  mutation createSermonSpeakerMutation($objects: [speaker_sermons_insert_input!]!) {
    insert_speaker_sermons(objects: $objects) {
      returning {
        speaker {
          ...speakersFragment
        }
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

export const deleteSermonSpeakersMutation = gql`
  mutation deleteSermonSpeakersMutation($sermonId: uuid) {
    delete_speaker_sermons(where: {sermon_id: {_eq: $sermonId}}) {
      returning {
        speaker {
          ...speakersFragment
        }
      }
    }
  }
  ${speakersFragment}
`;
