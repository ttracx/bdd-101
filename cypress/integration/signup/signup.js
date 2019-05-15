/* global Given, When, Then */
import { Given, Then } from "cypress-cucumber-preprocessor/steps";

const url = "http://localhost:3000";

Given("I visit the landing page", () => {
  cy.visit(url)
  cy.get('input#name').should('exist');
  cy.get('input#email').should('exist');
  cy.get('input#submit').should('exist');
});

When("I fill in signup details", () => {
  cy.get('form')
    .should('not.have.class', 'submitted')

  cy.get('input#name').type('blah')
  cy.get('input#email').type('donkey@gmail.com').should('have.value', 'donkey@gmail.com')
  cy.get('input#submit').click()
  cy.get('form')
      .should('have.class', 'submitted')
});

Then("I should see no validation issues", () => {
  cy.get('#output').contains('Thank you for your submission')
});

