Feature: Manage Envelopes

Background: Login
    Given I am on the GoodBudget login page
    When I login with predefined credentials

    
  Scenario: User adds, edits and deletes a new envelope successfully
    Given I am on the Envelopes section
    When I navigate to the envelope edit page
    And I add a new envelope named "Shopping" with amount 300
    When I click save changes button
    And I should see a confirmation modal and close it
    Then the envelope named "Shopping" should appear in the list
    When I navigate to the envelope edit page
    Then I edit the name "Travel" and the amount 150
    When I navigate to the envelope edit page
    Then I delete the envelope with id "3"