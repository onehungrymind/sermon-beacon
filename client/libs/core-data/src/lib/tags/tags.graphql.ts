import gql from 'graphql-tag';

export const tagsFragment = gql`
  fragment tagsFragment on tags {
    id
    property
    value
    created_at
    updated_at
  }
`;

export const sermonTagsFragment = gql`
  fragment sermonTagsFragment on sermon_tags_view {
    id
    property
    value
    sermon_id
    created_at
    updated_at
  }
`;

export const tagsQuery = gql`
  query tagsQuery {
    tags {
      ...tagsFragment
    }
  }
  ${sermonTagsFragment}
`;

export const sermonTagsQuery = gql`
  query sermonTagsQuery {
    sermon_tags_view {
      ...sermonTagsFragment
    }
  }
  ${sermonTagsFragment}
`;

export const sermonTagsQuery = gql`
  query sermonTagsQuery($id: uuid) {
    sermon_tags_view(where: {sermon_id: {_eq: $id}}) {
      ...sermonTagsFragment
    }
  }
  ${sermonTagsFragment}
`;

export const createTagsMutation = gql`
  mutation createTagMutation($objects: [tags_insert_input!]!) {
    insert_tags(objects: $objects) {
      returning {
        ...tagsFragment
      }
    }
  }
  ${tagsFragment}
`;

export const updateTagsMutation = gql`
  mutation updateTagsMutation($id: uuid!, $tags: tags_set_input) {
    update_tags(where: {id: {_eq: $id}}, _set: $tags) {
      returning {
        ...tagsFragment
      }
    }
  }
  ${tagsFragment}
`;

export const deleteTagsMutation = gql`
  mutation deleteTagsMutation($id: uuid!) {
    delete_tags(where: {id: {_eq: $id}}) {
      returning {
        ...tagsFragment
      }
    }
  }
  ${tagsFragment}
  `;
