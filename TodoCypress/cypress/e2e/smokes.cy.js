/// <reference types="cypress" />

import selectors from "../selectors";

describe('Application smoke tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  });
  
  it('Todo app is accessible and contains form for new todo item', () => {
    // DRY
    cy
      .get('[data-ui-test=todo-input]')
      .should('exist');
  });

  it('Loads todos on load', () => {
    cy
      .readAllTodos()
      .wait('@readAllTodos')
      .should(({response}) => {
        expect(response).not.be.undefined;
        expect(response.statusCode).to.eq(200);
      });
  });
  
  it('Be able to create a todo item', () => {
    cy.createTodo();

    cy
      .get(selectors.TODO_INPUT)
      .type('Learn .NET{enter}')
      .wait('@createTodo')
      .should(({response}) => {
        expect(response).not.be.undefined;
        expect(response.statusCode).to.eq(201);
        expect(response.body).to.be.any;
      });
    
    cy
      .get(selectors.TODO_INPUT)
      .type('Walk the dog{enter}')
      .wait('@createTodo')
      .should(({response}) => {
        expect(response).not.be.undefined;
        expect(response.statusCode).to.eq(201);
        expect(response.body).to.be.any;
      });

    cy
      .get(selectors.TODO_INPUT)
      .type('Prepare presentation{enter}')
      .wait('@createTodo')
      .should(({response}) => {
        expect(response).not.be.undefined;
        expect(response.statusCode).to.eq(201);
        expect(response.body).to.be.any;
      });
    
    cy
      .get(selectors.TODO_LIST)
      .get(selectors.TODO_ITEM)
      .should('have.length.at.least', 2);
  });
  
  it('Be able to complete a todo item', () => {
    cy.updateTodo();
    
    cy
      .get(selectors.TODO_ITEM)
      .should('have.length.gt', 0)
      .get(selectors.TODO_NOT_COMPLETED_ITEM)
      .first()
      .within(() => {
        cy
          .toggleTodoCompleted(true)
          .parents(selectors.TODO_ITEM)
          .should('have.class', 'completed');
        
        cy
          .wait('@updateTodo')
          .should(({response}) => {
            expect(response).not.be.undefined;
            expect(response.statusCode).to.eq(204);
          });
      });
  });

  it('Be able to delete a todo item', () => {
    cy.deleteTodo();
    
    cy
      .get(selectors.TODO_ITEM)
      .should('have.length.gt', 0)
      .then($before => {
        cy
          .get(selectors.TODO_ITEM)
          .last()
          .within(() => {
            cy
              .get(selectors.TODO_DESTROY)
              .click({ force: true });
            
            cy
              .wait('@deleteTodo')
              .should(({response}) => {
                expect(response).not.be.undefined;
                expect(response.statusCode).to.eq(204);
              });
          }).then(() => {
            cy
              .get(selectors.TODO_ITEM)
              .then($after => {
                expect($after.length).to.be.lessThan($before.length);
              });
          });
      });
  });
  
  context('Switch between filters', () => {
    [
      { filter: 'active', assert: 'not.be.checked' },
      { filter: 'completed', assert: 'be.checked' },
    ].forEach(({ filter, assert }) => {
      it(`Select only ${filter} todos`, function () {
        cy
          .get(selectors.by.filter(filter))
          .click()
          .get(selectors.TODO_TOGGLE)
          .should('have.length.gt', 0)
          .should(assert);
      });
    });
  });
});