Feature: User Signup, Login and Logout


  Scenario: User fills out signup form with valid data
    Given I am on the GoodBudget signup page
    When I fill the signup form with valid data
    Then I should see the GET STARTED button

  Scenario: User logs in and out with valid credentials
    Given I am on the GoodBudget login page
    When I login with predefined credentials
    Then I should be in the home page
    When I log out
    Then I should be redirected to the logout page


  Scenario: User tries to log in with invalid credentials
    Given I should be in the home page
    When I try to log in with invalid credentials
    Then I should see an error message about invalid credentials

  