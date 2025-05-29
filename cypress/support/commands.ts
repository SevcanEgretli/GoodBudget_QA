declare namespace Cypress {
  interface Chainable {
    closeChecklistIframe(): Chainable<void>;
    removeChecklistIframe(): Chainable<void>;
  }
}

Cypress.Commands.add("generateTestUser", () => {
  const timestamp = Date.now();
  const email = `user_${timestamp}@test.com`;
  const password = "TestPassword123";
  return cy.wrap({ email, password });
});

Cypress.Commands.add("logout", () => {
  cy.contains("Logout").click();
});

Cypress.Commands.add('closeChecklistIframe', () => {
  cy.get('iframe#userpilot-checklist').invoke('remove');
});

Cypress.Commands.add('removeChecklistIframe', () => {
  cy.document().then((doc) => {
    const iframe = doc.querySelector('iframe#userpilot-checklist');
    if (iframe) {
      iframe.remove();
    }
  });
});
