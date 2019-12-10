import gql from 'graphql-tag';

export const mediaTypesFragment = gql`
  fragment mediaTypesFragment on media {
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
  mutation updateMediaTypesMutation($media: media_types_set_input) {
    update_media_types((where: media_types_bool_exp!), _set: $media_types_set_input) {
      returning {
        ...mediaFragment
      }
    }
  }
  ${mediaTypesFragment}
`;

export const deleteMediaTypesMutation = gql`
  mutation deleteMediaTypesMutation($id: uuid!) {
    delete_media_types(where: media_types_bool_exp!) {
      returning {
        ...mediaTypesFragment
      }
    }
  }
  ${mediaTypesFragment}
`;