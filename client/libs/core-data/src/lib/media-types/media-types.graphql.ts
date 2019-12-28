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
  mutation updateMediaTypesMutation($name: String, $mediaType: media_types_set_input) {
    update_media_types(where: {name: {_eq: $name}}, _set: $mediaType) {
      returning {
        name
        description
      }
    }
  }
`;

export const deleteMediaTypesMutation = gql`
  mutation deleteMediaTypesMutation($name: String!) {
    delete_media_types(where: {name: {_eq: $name}}) {
      returning {
        ...mediaTypesFragment
      }
    }
  }
  ${mediaTypesFragment}
`;
