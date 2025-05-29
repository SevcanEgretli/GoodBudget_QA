export class SignUpPage {
  emailField = () => cy.get("#new_household_email");
  passwordField = () => cy.get("#new_household_new_password");
  planOption = () => cy.get("#new_household_plan_0");
  agreeTerms = () => cy.get("#new_household_terms_of_use");
  captcha = () => cy.get("#recaptcha-anchor-label");
  submitButton = () => cy.contains('button', 'GET STARTED');
}
