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
