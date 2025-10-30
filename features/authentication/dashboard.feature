Feature: Dashboard access after successful login

  Scenario: Verify user reaches dashboard after valid login and OTP
    Given I log in with valid credentials
    When I enter valid OTP
    And I click Continue after OTP
    Then I should be redirected to the dashboard
