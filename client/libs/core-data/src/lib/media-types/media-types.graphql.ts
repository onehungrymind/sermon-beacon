import gql from 'graphql-tag';

export const mediaTypesFragment = gql`
  fragment mediaTypesFragment on media_types {
    name
    description
  }
`;

export const mediaTypeQuery = gql`
  query mediaTypeQuery {
    media_types {
      ...mediaTypesFragment
    }
  }
  ${mediaTypesFragment}
`;

export const createMediaTypesMutation = gql`
  mutation createMediaTypesMutation($objects: [media_types_insert_input!]!) {
    insert_media_types(objects: $objects) {
      returning {
        ...mediaTypesFragment
      }
    }
  }
  ${mediaTypesFragment}
`;

export const updateMediaTypesMutation = gql`
  mutation updateMediaTypesMutation($id: uuid!, $media: media_types_set_input) {
    update_media_types(where: {name: {_eq: $name}}) {
      returning {
        ...mediaFragment
      }
    }
  }
  ${mediaTypesFragment}
`;

export const deleteMediaTypesMutation = gql`
  mutation deleteMediaTypesMutation($id: uuid!) {
    delete_media_types(where: {name: {_eq: $name}}) {
      returning {
        ...mediaTypesFragment
      }
    }
  }
  ${mediaTypesFragment}
`;