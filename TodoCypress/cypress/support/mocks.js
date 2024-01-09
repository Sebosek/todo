/**
 * HTTP mock responses
 *
 **/

import {GENERIC_PATH, TARGET_PATH} from "./consts";
import todos from '../fixtures/todos.json';

Cypress.Commands.add('mockReadAllTodos', (options = {}) => {
  let promise = Promise.resolve();
  if (options && typeof options === 'object' && options.hasOwnProperty('avoid')) {
    promise = new Promise((resolve, reject) => {
      options['avoid'] = resolve;
      options['error'] = reject;
    });
  }
  
  return cy.intercept('GET', GENERIC_PATH, async req => {
    try {
      await promise;
    
      req.reply({
        body: todos,
        statusCode: 200,
        ...options,
      });
    } catch {
      req.reply({
        body: {},
        statusCode: 500,
        ...options,
      });
    }
  }).as('mockReadAllTodos');
});

Cypress.Commands.add('mockCreateTodo', (options = {}) =>
  cy
    .intercept(
      'POST',
      GENERIC_PATH, 
      {
        statusCode: 201,
        ...options,
      })
    .as('mockCreateTodo'));

Cypress.Commands.add('mockUpdateTodo', (options = {}) =>
  cy
    .intercept(
      'PUT',
      TARGET_PATH, 
      {
        statusCode: 204,
        ...options,
      })
    .as('mockUpdateTodo'));

Cypress.Commands.add('mockDeleteTodo', (options = {}) =>
  cy
    .intercept(
      'DELETE',
      TARGET_PATH, 
      {
        statusCode: 204,
        ...options,
      })
    .as('mockDeleteTodo'));
