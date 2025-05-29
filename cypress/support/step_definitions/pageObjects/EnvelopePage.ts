export class EnvelopePage {
  wrapper = () => cy.get('#wrapper-envelopes');
  addEditButton = () => cy.get('#wrapper-envelopes').contains('Add / Edit');
  addEnvelopeButton = () =>  cy.contains('span.current', 'Monthly').parents('form').find('button.btn.btn-add').click();
  envelopeNameInput = () => cy.get('#-1 .row-name');
  envelopeAmountInput = () => cy.get('#-1 .row-amount');
  saveChangesButton = () => cy.get('#save-envelopes-btn');
  noThanksButton = () => cy.get('#fillEnvelopesModalNo');
}