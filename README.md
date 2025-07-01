# Cypress + Cucumber BDD Setup with Esbuild

> ✅ Verified with Cypress v14.3.2

This open-source project demonstrates how to configure Cypress to support `.feature` files using the Cucumber BDD syntax with the `@badeball/cypress-cucumber-preprocessor`. It focuses on building simple and real-world automation test scenarios to help learners and QA engineers get started quickly.

---

## 📁 Project Structure

```
cypress/
  ├── e2e/
  │   └── features/
  │       └── login.feature
  ├── support/
      ├── step_definitions/
      │   ├── loginSteps.js
      │   └── index.js
      └── e2e.js
cypress.config.js
package.json
```

---

## 📦 Installation

```bash
npm install --save-dev \
  cypress \
  @badeball/cypress-cucumber-preprocessor \
  @bahmutov/cypress-esbuild-preprocessor \
  esbuild
```

---

## 🔧 Configuration

### `cypress.config.js`

```js
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/features/*.feature",
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on("file:preprocessor", bundler);

      await addCucumberPreprocessorPlugin(on, {
        ...config,
        stepDefinitions: "cypress/support/step_definitions/**/*.js",
      });

      return config;
    },
  },
});
```

---

## ✍️ Feature Example

### `cypress/e2e/features/login.feature`

```gherkin
Feature: Login and Practice Page Navigation

  Scenario: Login and navigate to practice test pages
    Given I open the login page
    When I enter valid credentials
    Then I should see the success message

    When I click on the Practice menu
    And I click on the Test Login Page link
    Then I should see the login test instructions

    When I go back and click on the Test Exceptions link
    Then I should see the exceptions test instructions
```

---

## ✅ Step Definitions

### `cypress/support/step_definitions/loginSteps.js`

```js
const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

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
```

---

## 🛠 Troubleshooting

- Ensure `stepDefinitions` is inside either `support/` or `features/`, not directly under `e2e/`.
- If Cypress fails to launch after clearing cache, run:

```bash
npx cypress install
```

- If `addCucumberPreprocessorPlugin` throws `is not a function`, confirm correct version and `require().addCucumberPreprocessorPlugin`.

---

## ✅ You're all set!

To open Cypress Test Runner:

```bash
npx cypress open
```

To run tests headlessly:

```bash
npx cypress run --spec "cypress/e2e/features/login.feature"
```

---

## 🙌 Who is this for?

- QA Engineers learning Cypress for the first time  
- Testers exploring BDD-style UI automation  
- Developers writing acceptance tests  
- Anyone looking for a clean, minimal Cypress + Cucumber template

---

## 📌 Credits

This project is built to educate the QA community and provide a practical reference for BDD automation with Cypress.

---

## 📬 Contact

Created by [Venkatakishore Koneti](https://github.com/vkkoneti)  
Feel free to ⭐️ the repo or open an issue for suggestions or improvements.
