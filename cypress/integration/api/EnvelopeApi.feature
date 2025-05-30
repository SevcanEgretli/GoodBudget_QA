Feature: Envelopes API

  Scenario: Create a new envelope
    Given I login via API
    Then I create an envelope named "Test Envelope" with amount 250 via API
    Then the envelope named "Test Envelope" should have amount 250
    Then I update the envelope named "Test Envelope" to have name "SevcanUpdate" and amount 35
    Then I delete the envelope named "SevcanUpdate"
    