import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I open the login page', () => {
  cy.visit('https://practicetestautomation.com/practice-test-login/');
});

When('I enter valid credentials', () => {
  cy.get('#username').type('student');
  cy.get('#password').type('Password123');
  cy.get('#submit').click();
});

Then('I should see the success message', () => {
  cy.contains('Logged In Successfully').should('be.visible');
});
