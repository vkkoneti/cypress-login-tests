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


  Scenario: Login with invalid username
    Given I open the login page
    When I enter "wrongUser" and "Password123"
    Then I should see "Your username is invalid!"

  Scenario: Login with invalid password
    Given I open the login page
    When I enter "student" and "wrongPass"
    Then I should see "Your password is invalid!"

  Scenario: Login with empty fields
    Given I open the login page
    When I click login without entering credentials
    Then I should see "Please enter username and password"

  Scenario: Logout after successful login
    Given I login with valid credentials
    When I click the logout button
    Then I should be redirected to the login page

  Scenario: Validate UI elements
    Given I open the login page
    Then I should see username field, password field, and submit button
    And the password field should mask the input