import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, from, Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, shareReplay, tap } from 'rxjs/operators';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { environment } from '@env/environment';

const config = {
  domain: environment.Auth0.domain,
  client_id: environment.Auth0.client_id,
  redirect_uri: environment.Auth0.redirect_uri,
  token_name: environment.Auth0.token_name
};

export const { token_name } = config;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth0Client$ = (from(
    createAuth0Client({
      domain: config.domain,
      client_id: config.client_id,
      redirect_uri: config.redirect_uri
    })
  ) as Observable<Auth0Client>).pipe(
    shareReplay(1),
    catchError((err) => throwError(err))
  );

  isAuthenticated$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated()))
  );
  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
  );

  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();

  loggedIn: boolean = null;

  constructor (private router: Router) { }

  getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      tap((res: any) => this.setToken(res.cache.cache['default::openid profile email'].id_token)),
      concatMap((client: Auth0Client) => from(client.getUser(options))),
    );
  }

  localAuthSetup() {
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          return this.getUser$();
        }

        return of(loggedIn);
      })
    );
    const checkAuthSub = checkAuth$.subscribe((response: { [ key: string ]: any } | boolean) => {
      if (response) {
        const user = response;
        this.userProfileSubject$.next(user);
      }
      this.loggedIn = !!response;

      checkAuthSub.unsubscribe();
    });
  }

  login(redirectPath: string = '/') {
    this.auth0Client$.subscribe((client: Auth0Client) => {
      client.loginWithRedirect({
        redirect_uri: config.redirect_uri,
        appState: { target: redirectPath }
      });
    });
  }

  handleAuthCallback() {
    let targetRoute: string;
    const authComplete$ = this.auth0Client$.pipe(
      concatMap(() => this.handleRedirectCallback$),
      tap((cbRes) => {
        targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/';
      }),
      concatMap(() => {
        return combineLatest([
          this.getUser$(),
          this.isAuthenticated$
        ]);
      })
    );
    authComplete$.subscribe(([ user, loggedIn ]) => {
      this.userProfileSubject$.next(user);
      this.loggedIn = loggedIn;
      this.router.navigate([ targetRoute ]);
    });
  }

  logout() {
    this.auth0Client$.subscribe((client: Auth0Client) => {
      client.logout({
        client_id: config.client_id,
        returnTo: `${window.location.origin}`
      });
      this.removeToken();
    });
  }

  getToken() {
    return localStorage.getItem(config.token_name);
  }

  private setToken(token: string) {
    localStorage.setItem(config.token_name, token);
  }

  private removeToken() {
    localStorage.removeItem(config.token_name);
  }
}
