export class FillEnvelopesPage {
  fillEnvelopesButton = () => cy.get('a.btn[href="/envelopes/fill"]');
  netIncomeAmt = () => cy.get('#specify-amount');
  netIncomePayer = () => cy.get('#specify-fillname');
  netIncomeDateInput = () => cy.get('#specify-date');
  netIncomeRememberCheckbox = () => cy.get('#specify-remember-wrapper input[type="checkbox"]');
  netIncomeRememberInput = () => cy.get('#specify-remember-wrapper input[name="rememberfill"]');
  netIncomeSchedule = () => cy.get('#specify-schedule-wrapper');
  note = () => cy.get('#specify-notes');
  saveButton = () => cy.get('#incomeSummary [type="submit"]');

}