import gql from 'graphql-tag';

export const mediaFragment = gql`
  fragment mediaFragment on media {
    id
    url
    embedCode
    created_at
    updated_at
    type
    sermon_id
  }
`;

export const mediaQuery = gql`
  query mediaQuery {
    media {
      ...mediaFragment
    }
  }
  ${mediaFragment}
`;

export const mediaBySermonIdQuery = gql`
  query mediaBySermonIdQuery($id: uuid) {
    media(where: { sermon_id: {_eq: $id}}) {
      ...mediaFragment
    }
  }
  ${mediaFragment}
`;

export const createMediaMutation = gql`
  mutation createMediaMutation($objects: [media_insert_input!]!) {
    insert_media(objects: $objects) {
      returning {
        ...mediaFragment
      }
    }
  }
  ${mediaFragment}
`;

export const updateMediaMutation = gql`
  mutation updateMediaMutation($id: uuid!, $media: media_set_input) {
    update_media(where: {id: {_eq: $id}}, _set: $media) {
      returning {
        ...mediaFragment
      }
    }
  }
  ${mediaFragment}
`;

export const deleteMediaMutation = gql`
  mutation deleteMediaMutation($id: uuid!) {
    delete_media(where: {id: {_eq: $id}}) {
      returning {
        ...mediaFragment
      }
    }
  }
  ${mediaFragment}
`;

export const deleteMediaBySermonIdMutation = gql`
  mutation deleteMediaMutation($id: uuid!) {
    delete_media(where: {sermon_id: {_eq: $id}}) {
      returning {
        ...mediaFragment
      }
    }
  }
  ${mediaFragment}
`;
