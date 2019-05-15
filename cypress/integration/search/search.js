/* global Given, When, Then, cy, And */
import { Given } from "cypress-cucumber-preprocessor/steps";

Given("I am on the google home page", () => {
  cy.visit("http://www.google.com")
  cy.screenshot()
})

