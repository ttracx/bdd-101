/* global Given, When, Then */
import { Given, Then } from "cypress-cucumber-preprocessor/steps";
const And = When;
const selectors = {
  messagelist: '[data-test=message-list]',
  composeButton: '[data-test=composeButton]',
  composeWindow: '[data-test=composeWindow]',
  allRead: '[data-test=allRead]',
  message: '[data-test=message]',
  read: '[data-test=read]',
  erase: '[data-test=erase]',
}

Given('I log in', () => {
  cy.visit("/")
  cy.title().should('include', 'TDD BDD Workshop', 'render correct page title')
  cy.eyesCheckWindow('Home Page');
  expect('name').to.not.equal('Jane')
});

And('I see the message list', () => {
  const composeButton = cy.get(selectors.composeButton);
  composeButton.should('exist')
  composeButton.click()
})

Given("I click compose", () => {
  cy.get(selectors.composeButton).should('exist').click()
})

Then("the compose window should show", () => {
  cy.get(selectors.composeWindow).should('exist')
})

When("I click mark all as read", () => {
  cy.get(selectors.allRead).click();
})

When("I click mark as read", () => {
  cy.get(selectors.read).click()
})

When("I click erase", () => {
  cy.get(selectors.erase).click()
})

Then("the message should be set to read", () => {
  cy.get('message').should('not.have.class', 'unread')
})

Then("All messages should be set to read", () => {
  cy.get(selectors.messagelist).within((list) => {
    cy.get(selectors.message).should('not.have.class', 'unread')
  })
})

Then("the message should be removed from the list", () => { })