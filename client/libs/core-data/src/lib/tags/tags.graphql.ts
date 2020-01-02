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

export const tagsQuery = gql`
  query tagsQuery {
    tags {
      ...tagsFragment
    }
  }
  ${tagsFragment}
`;

export const tagsBySermonIdQuery = gql`
  query tagsBySermonIdQuery($id: uuid) {
    tags(where: {sermon_tags: {sermon_id: {_eq: $id}}}) {
      ...tagsFragment
    }
  }
  ${tagsFragment}
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

export const createSermonTagsMutation = gql`
  mutation createSermonTagsMutation($objects: [sermon_tags_insert_input!]!) {
    insert_sermon_tags(objects: $objects) {
      returning {
        tag {
          ...tagsFragment
        }
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

export const updateTagsBySermonIdMutation = gql`
  mutation updateTagsBySermonIdMutation($id: uuid!, $tags: tags_set_input) {
    update_tags(where: {sermon_tags: {sermon_id: {_eq: $id}}}, _set: $tags) {
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

export const deleteSermonTagsMutation = gql`
  mutation deleteSermonTagsMutation($sermonId: uuid!) {
    delete_sermon_tags(where: {sermon_id: {_eq: $sermonId}}) {
      returning {
        tag {
          ...tagsFragment
        }
      }
    }
  }
  ${tagsFragment}
  `;
