Feature: Authentication and Authorization tests

  Feature Description: 
    In order to ensure that the application is secure
    As a user
    I want to be able to authenticate and authorize the application

  Scenario: User logs in with valid credentials
    Given I navigate to the login page
    When I enter the email as "<email>"
    And I enter the password as "<password>"
    And I press the sign in button
    Then I should be redirected to the dashboard page

  Examples:
    | email | password |
    | haseebudeen@outlook.com | 12345678a |

  Scenario: User logs in with invalid credentials
    Given I am on the login page
    When I fill in email with "<invalidEmail>"
    And I fill in password with "<invalidPassword>"
    And I press sign in button
    Then I should see "<errorMessage>"

  Examples:
   | invalidEmail | invalidPassword | errorMessage |
   | invalidEmail@outlook.com | 2l3k4kj | User not found with email invalidEmail@outlook.comDismiss |