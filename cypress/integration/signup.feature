Feature: User sign up

  A user signs up to our newsletter to be notified of latest information.

@skip
  Scenario: User navigates to site
    Given I visit the landing page
    When I fill in signup details
    Then I should see no form validation error messages
  # Scenario: User enters details
  # Scenario: User submits form
