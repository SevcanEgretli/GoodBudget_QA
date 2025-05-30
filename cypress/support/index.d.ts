/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    generateTestUser(): Chainable<{ email: string; password: string }>;
    logout(): Chainable<void>;
    loginViaApi(): Chainable<void>;
  }
}
