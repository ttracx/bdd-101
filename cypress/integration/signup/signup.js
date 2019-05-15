/* eslint-disable no-unused-vars */
/* global Given, When, Then, cy, And */
import { Given, Then } from "cypress-cucumber-preprocessor/steps";
// eslint-disable-next-line no-unused-vars
const And = Then;

const url = "http://localhost:3000";

Given("I visit the landing page", () => {
  cy.visit(url)
  cy.get('input#name').should('exist');
  cy.get('input#email').should('exist');
  cy.get('input#submit').should('exist');
});

And("I should see the signup form", () => {
  cy.get('#signup').should('exist');
})


