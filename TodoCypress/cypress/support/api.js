/**
 * HTTP interceptors
 * 
 **/

import {GENERIC_PATH, TARGET_PATH} from "./consts";

Cypress.Commands.add(
  "readAllTodos",
  () => cy.intercept("GET", GENERIC_PATH).as("readAllTodos"));

Cypress.Commands.add(
  "createTodo",
  () => cy.intercept("POST", GENERIC_PATH).as("createTodo"));

Cypress.Commands.add(
  "updateTodo",
  () => cy.intercept("PUT", TARGET_PATH).as("updateTodo"));

Cypress.Commands.add(
  "deleteTodo",
  () => cy.intercept("DELETE", TARGET_PATH).as("deleteTodo"));