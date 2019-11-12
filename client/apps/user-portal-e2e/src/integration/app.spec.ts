import { getGreeting } from '../support/app.po';

describe('user-portal', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to user-portal!');
  });
});
