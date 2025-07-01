import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Login Flow
Given("I open the login page", () => {
  cy.visit("https://practicetestautomation.com/practice-test-login/");
});

When("I enter valid credentials", () => {
  cy.get("#username").type("student");
  cy.get("#password").type("Password123");
  cy.get("#submit").click();
});

Then("I should see the success message", () => {
  cy.contains("Logged In Successfully").should("be.visible");
});

// Practice Navigation
When("I click on the Practice menu", () => {
  cy.contains("Practice").click();
});

When("I click on the Test Login Page link", () => {
  cy.contains("Test Login Page").click();
});

Then("I should see the login test instructions", () => {
  cy.url().should("include", "practice-test-login");
  cy.contains("Test login").should("be.visible");
});

When("I go back and click on the Test Exceptions link", () => {
  cy.go("back");
  cy.contains("Test Exceptions").click();
});

Then("I should see the exceptions test instructions", () => {
  cy.url().should("include", "practice-test-exceptions");
  cy.contains("Test Exceptions").should("be.visible");
});
