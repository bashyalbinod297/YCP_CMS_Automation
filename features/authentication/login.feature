Feature: Login functionality

  Scenario: Login with blank fields
    Given I navigate to the login page
    When I click on Sign In without entering email and password
    Then I should see "Email is required" error
    And I should see "Password is required" error

  Scenario: Login with invalid email
    Given I navigate to the login page
    When I enter email "abc" and password "password123"
    Then I should see "Must be a valid email" error

  Scenario: Login with invalid credentials
    Given I navigate to the login page
    When I enter email "user@example.com" and password "wrongpass"
    When I click on Sign In button
    Then I should see toast message "Unauthorized"

  Scenario: Login with valid credentials
    Given I navigate to the login page
    When I enter email "bashyal.binod297@gmail.com" and password "Aa1234567@"
    When I click on Sign In button
    Then I should be redirected to OTP verification screen
