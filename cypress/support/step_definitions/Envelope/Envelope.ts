import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { EnvelopePage } from "../pageObjects/EnvelopePage";

const envelopePage = new EnvelopePage();

Given("I am on the Envelopes section", () => {
  cy.visit("/home");
  envelopePage.wrapper().should('be.visible');
});

When('I navigate to the envelope edit page', () => {
  envelopePage.addEditButton().click();
});

When("I add a new envelope named {string} with amount {int}", (name: string, amount: number) => {
  envelopePage.addEnvelopeButton().click();
  envelopePage.envelopeNameInput().type(name);
  envelopePage.envelopeAmountInput().type(amount.toString());
});

When ("I click save changes button", () => {
    envelopePage.saveChangesButton().click();
});

Then("I should see a confirmation modal and close it", () => {
  cy.contains("New Envelopes Created!").should("be.visible");
  envelopePage.noThanksButton().click();
  cy.contains("Welcome to Goodbudget! We're glad you're here.").should("be.visible");
});

Then("the envelope named {string} should appear in the list", (envelopeName: string) => {
  envelopePage.wrapper().should('contain.text', envelopeName);
});

Then("I edit the name {string} and the amount {int}", (name: string, amount: number) => {
  cy.get('ul#envelopes-reg > li#3').within(() => {
    cy.get('.row-name input')
      .clear()
      .type(name);

    cy.get('.row-amount input')
      .clear()
      .type(amount.toString());
  });
  envelopePage.saveChangesButton().click();
});

Then("I delete the envelope with id {string}", (envelopeId: string) => {
  cy.get('ul#envelopes-reg').invoke('html').then((html) => {
    console.log(' Envelope list HTML:', html);
  });

  cy.get(`ul#envelopes-reg li[id="${envelopeId}"]`).should('exist');

  cy.get(`ul#envelopes-reg li[id="${envelopeId}"]`).within(() => {
    cy.get('a.btn-remove').click({ force: true });
  });

  envelopePage.saveChangesButton().click();
  cy.wait(1000);
  cy.get(`ul#envelopes-reg li[id="${envelopeId}"]`, { timeout: 5000 }).should('not.exist');
});
