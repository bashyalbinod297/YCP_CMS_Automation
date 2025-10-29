Feature: OTP Verification
  Verify OTP screen and successful login to dashboard

  Scenario: OTP verification with valid OTP
    Given I am on the OTP verification page after valid login
    When I enter OTP "1234"
    And I click on "Continue" button
    Then I should be redirected to dashboard
