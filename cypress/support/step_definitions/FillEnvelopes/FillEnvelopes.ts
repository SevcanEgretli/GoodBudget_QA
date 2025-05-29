import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { FillEnvelopesPage } from "../pageObjects/FillEnvelopesPage";

const fillEnvelopesPage = new FillEnvelopesPage();

Given("I navigate to the Fill Envelopes page", () => {
  fillEnvelopesPage.fillEnvelopesButton().click();
  cy.url().should('include', '/envelopes/fill');
});

When("I fill new income as {int} amount, {string} payer", (income: number, payer: string) => {
  fillEnvelopesPage.netIncomeAmt().type(income.toString());
  fillEnvelopesPage.netIncomePayer().type(payer)
});

When("I select the date as {string}", (date: string) => {
  fillEnvelopesPage.netIncomeDateInput()
    .click()
    .clear()
    .type(date);
    // .blur();
});

Then("I check the remember checkbox and type {string}", (text: string) => {
  fillEnvelopesPage.netIncomeRememberCheckbox().check({ force: true });
  fillEnvelopesPage.netIncomeRememberInput().should('be.visible').type(text);
});

Then("I distribute {int} to envelope {string}", (amount: number, envelopeName: string) => {
  cy.get('.fill-section fieldset').contains('h4', envelopeName).parents('fieldset').within(() => {
    cy.get('.input-append input[type="text"]').clear().type(amount.toString());
  });
});

When("I add {string} review and save the filled envelopes", (note: string) => {
  const fillEnvelopesPage = new FillEnvelopesPage();
  fillEnvelopesPage.note().clear().type(note);
  fillEnvelopesPage.saveButton().click();
});
