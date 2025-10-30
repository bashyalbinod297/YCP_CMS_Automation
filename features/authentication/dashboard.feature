Feature: Dashboard Navigation and Tab Functionality

  As a logged-in user,
  I want to verify that the dashboard loads correctly after login and OTP verification,
  so that I can ensure the navigation and tab features are working as expected.

  Scenario: Verify Dashboard Loads After Login and OTP Verification
    Given I am logged in and on the dashboard page
    Then the dashboard should be displayed
    And the hamburger menu button should be visible and clickable
    When I click the hamburger menu button
    Then the sidebar menu should open

  Scenario: Verify Daily Tab Functionality
    Given I am logged in and on the dashboard page
    When I click on the "Daily" tab
    Then the "Daily" tab should be active

  Scenario: Verify Weekly Tab Functionality
    Given I am logged in and on the dashboard page
    When I click on the "Weekly" tab
    Then the "Weekly" tab should be active

  Scenario: Verify Monthly Tab Functionality
    Given I am logged in and on the dashboard page
    When I click on the "Monthly" tab
    Then the "Monthly" tab should be active
