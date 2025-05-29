import './commands';
beforeEach(() => {
  cy.removeChecklistIframe();
});

Cypress.on('uncaught:exception', () => {
  return false;
});

