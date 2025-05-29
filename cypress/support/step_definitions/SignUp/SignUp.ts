import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { SignUpPage } from "../pageObjects/SignUpPage";

const signUpPage = new SignUpPage();

let email: string;
let password: string;

Given("I am on the GoodBudget signup page", () => {
  cy.visit("/signup");
});

When("I fill the signup form with valid data", () => {
  cy.generateTestUser().then((user) => {
    email = user.email;
    password = user.password;

    signUpPage.emailField().type(email);
    signUpPage.passwordField().type(password);
    signUpPage.planOption().click();
    signUpPage.agreeTerms().click();

// This step only fills out the signup form without submitting it,
// because the real reCAPTCHA cannot be bypassed in the current test environment.
    cy.get('#g-recaptcha-response').then($el => {
      if ($el.length) {
        cy.wrap($el).invoke('val', 'mocked-captcha-token');
      }
    });
  });
});

Then("I should see the GET STARTED button", () => {
  cy.get('#signup-submit').should('contain.text', 'GET STARTED');
});
