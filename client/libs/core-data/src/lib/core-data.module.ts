import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ApolloLink } from 'apollo-link';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { setContext } from 'apollo-link-context';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { environment } from '@env/environment';
import { token_name } from './auth/auth.service';

const uri = environment.production ? 'https://server-beacon.herokuapp.com/v1/graphql' : 'http://127.0.0.1:8080/v1/graphql';

export function createApollo(httpLink: HttpLink) {
  const token = localStorage.getItem(token_name);
  const auth = setContext((operation, context) => ({
    headers: token ? {
      Authorization:  `Bearer ${token}`
    } : {
      'X-Hasura-Role': 'anonymous',
    },
  }));

  return {
    link: ApolloLink.from([auth, httpLink.create({ uri })]),
    cache: new InMemoryCache()
  };
}

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ],
  exports: [ApolloModule, HttpLinkModule]
})
export class CoreDataModule {}
