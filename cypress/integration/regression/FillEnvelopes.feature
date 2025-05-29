Scenario: Successfully fill envelopes from new income
  Given I navigate to the Fill Envelopes page
  When I choose to fill from new income of 500
  And I distribute 300 to envelope "Groceries"
  And I distribute 200 to envelope "Gas"
  And I review and save the filled envelopes
  Then I should see a confirmation message
