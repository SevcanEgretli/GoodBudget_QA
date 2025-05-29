Feature: Filling Envelopes

Background: Login
    Given I am on the GoodBudget login page
    When I login with predefined credentials


Scenario: Successfully fill envelopes from new income
  Given I navigate to the Fill Envelopes page
  When I fill new income as 39 amount, "test" payer
  Then I select the date as "11/09/2025"
  Then I check the remember checkbox and type "hello"
  And I distribute 60 to envelope "Groceries"
  And I distribute 200 to envelope "Gas"
  And I add "Test note" review and save the filled envelopes
#   Then I should see a confirmation message
