Feature: User sign up

  A user signs up to our newsletter to be notified of latest information.

  Background:
    Given I visit the landing page

@skip
  Scenario: User navigates to site
    Then I should see the signup form

@skip
  Scenario: User fills in signup form
    When I fill in the sign up form
    Then I should see no form validation error messages

@skip
  Scenario: User presses submit without filling in form
    When I fill in the sign up form
    And I press submit
    Then I should see a confirmation message
