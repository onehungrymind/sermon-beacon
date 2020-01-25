// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  Auth0: {
    domain: 'helpq.auth0.com',
    client_id: '5cv0V1XciTFKSQ9b4qc7JMgcjjyD97zK',
    redirect_uri: `${window.location.origin}/callback`,
    token_name: 'auth0:SermonBeacon::id_token'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
