import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Tags } from './tags.model';
import { tagsQuery, updateTagsMutation, createTagsMutation, deleteTagsMutation } from './tags.graphql';
import { map } from 'rxjs/operators';
import { ApolloQueryResult } from 'apollo-client';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private apollo: Apollo) { }

  all(): Observable<Tags[]> {
    return this.apollo.query({
      query: tagsQuery,
      fetchPolicy: 'network-only'
    }).pipe(map((res: ApolloQueryResult<any>) => res.data.tags))
  }

  create(tags: Partial<Tags>) {
    delete tags.id;
    delete tags.created_at;
    delete tags.updated_at;

    return this.apollo.mutate({
      mutation: createTagsMutation,
      variables: {
        objects: tags
      }
    }).pipe(map((res: ApolloQueryResult<any>) => 
    res.data.insert_tags.returning[0]))
  }

  update(tags: Partial<Tags>) {
    delete (tags as any).__typename;

    return this.apollo.mutate({
      mutation: updateTagsMutation,
      variables: {
        id: tags.id,
        tags
      }
    }).pipe(map((res: ApolloQueryResult<any>) =>
    res.data.update_tags.returning[0]))
  }

  delete(tags: Partial<Tags>) {
    return this.apollo.mutate({
      mutation: deleteTagsMutation,
      variables: {
        id: tags.id
      }
    }).pipe(map((res: ApolloQueryResult<any>) =>
      res.data.delete_tags.returning[0]))
  }

}
