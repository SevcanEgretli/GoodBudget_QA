declare namespace Cypress {
  interface Chainable {
    closeChecklistIframe(): Chainable<void>;
    removeChecklistIframe(): Chainable<void>;
    loginViaApi(username: string, password: string): Chainable<void>;
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

Cypress.Commands.add('loginViaApi', () => {
  cy.fixture('users').then((users) => {
    const user = users.validUser;

    cy.request({
      method: 'POST',
      url: '/login_check',
      form: true,
      body: {
        _username: user.email,
        _password: user.password,
        _remember_me: 'on'
      },
      followRedirect: false
    }).then((response) => {
      expect(response.status).to.eq(302);
    });
  });
});