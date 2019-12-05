import gql from 'graphql-tag';

export const sermonFragment = gql`
  fragment sermonFragment on sermons {
    id
    title
    subject
    date
    created_at
    updated_at
  }
`;

export const sermonQuery = gql`
  query sermonQuery {
    sermons {
      ...sermonFragment
    }
  }
  ${sermonFragment}
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