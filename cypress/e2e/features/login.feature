Feature: Login

  Scenario: Successful login
    Given I open the login page
    When I enter valid credentials
    Then I should see the success message
