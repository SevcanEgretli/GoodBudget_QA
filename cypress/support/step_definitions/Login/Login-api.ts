import { Given } from "@badeball/cypress-cucumber-preprocessor";

Given("I login via API", () => {
  cy.loginViaApi();
});
