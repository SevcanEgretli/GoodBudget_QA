import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { EnvelopePage } from "../pageObjects/EnvelopePage";

const envelopePage = new EnvelopePage();
let uniqueEnvelopeName: string;

Given("I am on the Envelopes section", () => {
  cy.visit("/home");
  envelopePage.wrapper().should('be.visible');
});

When('I navigate to the envelope edit page', () => {
  envelopePage.addEditButton().click();
});

When("I add a new envelope named {string} with amount {int}", (name: string, amount: number) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  uniqueEnvelopeName = `${name}-${timestamp}`;

  envelopePage.addEnvelopeButton().click();
  envelopePage.envelopeNameInput().type(uniqueEnvelopeName);
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
  envelopePage.wrapper().should('contain.text', uniqueEnvelopeName);
});

Then("I edit the name {string} and the amount {int}", (newName: string, newAmount: number) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const newUniqueName = `${newName}-${timestamp}`;

  cy.get("ul#envelopes-reg > li").each(($el) => {
    cy.wrap($el).within(() => {
      cy.get(".row-name input").invoke("val").then((val) => {
        if (val === uniqueEnvelopeName) {
          cy.get(".row-name input").clear().type(newUniqueName);
          cy.get(".row-amount input").clear().type(newAmount.toString());
          cy.wrap($el).find(".row-amount input").blur();
        }
      });
    });
  });

  envelopePage.saveChangesButton().click();
  uniqueEnvelopeName = newUniqueName;
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
