// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import selectors from "../selectors";

Cypress.Commands.add(
  "toggleTodoCompleted",
  { prevSubject: "optional" },
  ($el, complete) => {
    if (complete === undefined) {
      throw new Error("Command required 'complete' parameter");
    }

    if ($el && complete) {
      return cy.get($el).check();
    }
    if ($el && !complete) {
      return cy.get($el).uncheck();
    }
    
    if (complete) {
      return cy.get(selectors.TODO_TOGGLE).check();
    }
    
    return cy.get(selectors.TODO_TOGGLE).uncheck();
  });