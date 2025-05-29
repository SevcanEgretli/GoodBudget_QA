export class LoginPage {
  emailField = () => cy.get("#username");
  passwordField = () => cy.get("#password");
  rememberMe = () => cy.get("#remember_me");
  loginButton = () => cy.contains('button[type="submit"]', 'Log In');
}
