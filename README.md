
# Cypress + Cucumber BDD Setup with Esbuild

> ✅ Verified with Cypress v14.3.2

This guide walks you through configuring Cypress to support `.feature` files using the Cucumber BDD syntax with the `@badeball/cypress-cucumber-preprocessor`.

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
Feature: Login

  Scenario: Successful login
    Given I open the login page
    When I enter valid credentials
    Then I should see the success message
```

---

## ✅ Step Definitions

### `cypress/support/step_definitions/loginSteps.js`

```js
const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given("I open the login page", () => {
  cy.visit("https://example.com/login");
});

When("I enter valid credentials", () => {
  cy.get("#username").type("admin");
  cy.get("#password").type("admin123");
  cy.get("#login").click();
});

Then("I should see the success message", () => {
  cy.contains("Welcome").should("be.visible");
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

To open Cypress:

```bash
npx cypress open
```

---

## 📌 Credits

This configuration is built and verified through extensive trial/debugging to support public forums and streamline BDD automation setup.
