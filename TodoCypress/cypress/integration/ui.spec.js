/// <reference types="cypress" />

import selectors from "../selectors";

describe('Application smoke tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  });

  it('Present loading state while loading todos and show results', () => {
    cy
      .mockReadAllTodos({ delay: 200 })
      .get(selectors.TODO_LOADING)
      .should('exist')
      .wait('@mockReadAllTodos')
      .get(selectors.TODO_ITEM)
      .should('have.length', 3);
  });

  it('Loading todos failed with toast message', () => {
    cy
      .mockReadAllTodos({ statusCode: 400, body: null })
      .wait('@mockReadAllTodos')
      .get(selectors.TODO_LOADING_ERROR)
      .should('exist');
  });
  
  it('Create todo and show loading state while todo is created', () => {
    cy
      .mockReadAllTodos()
      .mockCreateTodo({delay: 200})
      .get(selectors.TODO_INPUT)
      .type('Walk the dog{enter}')
      .get(selectors.TODO_ITEM_LOADING)
      .should('be.visible')
      .wait('@mockCreateTodo')
      .get(selectors.TODO_ITEM)
      .should('have.length.at.least', 4);
  });

  it('Create todo failed with toast message', () => {
    cy
      .mockReadAllTodos()
      .mockCreateTodo({statusCode: 500, body: null})
      .get(selectors.TODO_INPUT)
      .type('Walk the dog{enter}')
      .wait('@mockCreateTodo')
      .get(selectors.TODO_ERROR)
      .should('be.visible');
  });
  
  it('Complete todo and show loading state while processing', () => {
    cy
      .mockReadAllTodos()
      .mockUpdateTodo({delay: 200})
      .get(selectors.by.id('b7ccbcaf-d187-408c-95be-1ec3f00903a1'))
      .within(() => {
        cy
          .get(selectors.TODO_TOGGLE)
          .toggleTodoCompleted(true)
          .get(selectors.TODO_LOADING)
          .should('be.visible')
          .wait('@mockUpdateTodo')
          .get(selectors.TODO_TOGGLE)
          .should('be.checked');
      });
  });

  it('Complete todo failed with toast message', () => {
    cy
      .mockReadAllTodos()
      .mockUpdateTodo({statusCode: 500, body: null})
      .get(selectors.by.id('b7ccbcaf-d187-408c-95be-1ec3f00903a1'))
      .within(() => {
        cy
          .get(selectors.TODO_TOGGLE)
          .toggleTodoCompleted(true)
          .wait('@mockUpdateTodo');
      })
      .get(selectors.TODO_ERROR)
      .should('be.visible');
  });

  it('Delete todo and show loading state while processing', () => {
    cy
      .mockReadAllTodos()
      .mockDeleteTodo({delay: 200})
      .get(selectors.by.id('b7ccbcaf-d187-408c-95be-1ec3f00903a1'))
      .within(() => {
        cy
          .get(selectors.TODO_DESTROY)
          .click({force: true})
          .get(selectors.TODO_LOADING)
          .should('be.visible')
          .wait('@mockDeleteTodo');
      })
      .get(selectors.TODO_ITEM)
      .should('have.length', 2);
  });

  it('Delete todo failed with toast message', () => {
    cy
      .mockReadAllTodos()
      .mockDeleteTodo({statusCode: 500, body: null})
      .get(selectors.by.id('b7ccbcaf-d187-408c-95be-1ec3f00903a1'))
      .within(() => {
        cy
          .get(selectors.TODO_DESTROY)
          .click({force: true});
      })
      .get(selectors.TODO_ERROR)
      .should('be.visible');
  });
  
  context('Switch between filters', () => {
    [
      { filter: 'active', assert: 'not.be.checked' },
      { filter: 'completed', assert: 'be.checked' },
    ].forEach(({ filter, assert }) => {
      it(`Select only ${filter} todos`, function () {
        cy
          .mockReadAllTodos()
          .get(selectors.by.filter(filter))
          .click()
          .get(selectors.TODO_TOGGLE)
          .should(assert);
      });
    });
  });
});