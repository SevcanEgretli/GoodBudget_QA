Cypress.Commands.add("generateTestUser", () => {
  const timestamp = Date.now();
  const email = `user_${timestamp}@test.com`;
  const password = "TestPassword123";
  return cy.wrap({ email, password });
});

Cypress.Commands.add("logout", () => {
  cy.contains("Logout").click();
});
