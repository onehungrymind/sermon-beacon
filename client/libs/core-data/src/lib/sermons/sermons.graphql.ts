import gql from 'graphql-tag';

export const sermonFragment = gql`
  fragment sermonFragment on sermons {
    id
    title
    subject
    date
    media_id
    created_at
    updated_at
  }
`;

export const speakerSermonFragment = gql`
  fragment speakerSermonFragment on speaker_sermons_view {
    id
    title
    subject
    date
    speaker_id
    media_id
    created_at
    updated_at
  }
`;

export const sermonQuery = gql`
  query sermonQuery($titleQuery: String_comparison_exp, $speakerNameQuery: String_comparison_exp, $dateQuery: date_comparison_exp) {
    sermons(where: {
      _and: [
        {date: $dateQuery},
        {title: $titleQuery}
      ],
      _or: [
        {sermon_speakers: {speaker: {first_name: $speakerNameQuery}}},
        {sermon_speakers: {speaker: {last_name: $speakerNameQuery}}}
      ]
    }) {
      ...sermonFragment
    }
  }
  ${sermonFragment}
`;

export const speakerSermonQuery = gql`
  query speakerSermonQuery {
    speaker_sermons_view {
      ...speakerSermonFragment
    }
  }
  ${speakerSermonFragment}
`;

export const createSermonMutation = gql`
  mutation createSermonMutation($objects: [sermons_insert_input!]!) {
    insert_sermons(objects: $objects) {
      returning {
        ...sermonFragment
      }
    }
  }
  ${sermonFragment}
`;

export const updateSermonMutation = gql`
  mutation updateSermonMutation($id: uuid!, $sermon: sermons_set_input) {
    update_sermons(where: {id: {_eq: $id}}, _set: $sermon) {
      returning {
        ...sermonFragment
      }
    }
  }
  ${sermonFragment}
`;

export const deleteSermonMutation = gql`
  mutation deleteSermonMutation($id: uuid!) {
    delete_sermons(where: {id: {_eq: $id}}) {
      returning {
        ...sermonFragment
      }
    }
  }
  ${sermonFragment}
`;
