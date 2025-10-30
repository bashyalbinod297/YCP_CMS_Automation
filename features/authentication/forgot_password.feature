@forgot-password @login
Feature: Forgot Password functionality

  Scenario: Forgot password with invalid email
    Given I click on Forgot Password link
    When I enter forgot password email "invalid@example.com"
    And I click on Continue button
    Then I should see toast message "UserID does not exist"

  Scenario: Forgot password with valid email
    Given I click on Forgot Password link
    When I enter forgot password email "bashyal.binod297@gmail.com"
    And I click on Continue button
    Then I should be redirected to code verification page