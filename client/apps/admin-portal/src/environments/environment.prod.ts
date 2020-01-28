export const environment = {
  production: true,
  Auth0: {
    domain: 'helpq.auth0.com',
    client_id: '5cv0V1XciTFKSQ9b4qc7JMgcjjyD97zK',
    redirect_uri: `${window.location.origin}/callback`,
    token_name: 'auth0:SermonBeacon::id_token'
  }
};
