import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../pageObjects/LoginPage";

const loginPage = new LoginPage();

function loginWithCredentials(email: string, password: string) {
  loginPage.emailField().type(email);
  loginPage.passwordField().type(password);
  loginPage.rememberMe().click();
  loginPage.loginButton().click();
}

Given("I am on the GoodBudget login page", () => {
  cy.visit("/login");
});

When("I login with predefined credentials", () => {
  cy.fixture("users").then((data) => {
    const { email, password } = data.validUser;
    loginWithCredentials(email, password);
  });
});

Then("I should be redirected to the home page", () => {
  cy.url().should("include", "/home");
  cy.get("#hi").should("contain.text", "test_sevcan");
  cy.contains("Welcome to Goodbudget! We're glad you're here.").should("be.visible");
});

When("I log out", () => {
  cy.contains("Logout").click();
});

Then("I should be redirected to the logout page", () => {
  cy.url().should("include", "/logout");
  cy.contains("See you soon!").should("be.visible");
  cy.contains("You've been successfully logged out").should("be.visible");
});

When("I try to log in with invalid credentials", () => {
  cy.fixture("users").then((data) => {
    const { email, password } = data.invalidUser;
    loginWithCredentials(email, password);
  });
});

Then("I should see an error message about invalid credentials", () => {
  cy.contains("Hm... that username and/or password didn't work.").should("be.visible");
});