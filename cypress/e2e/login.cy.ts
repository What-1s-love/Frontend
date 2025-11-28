/// <reference types="cypress" />
describe('Login Flow E2E', () => {
  it('should login successfully', () => {
    
    cy.visit('http://localhost:4200/items');

    cy.contains('Новини IT'); 

 
    cy.get('a[href="/login"]').click();

    
    cy.url().should('include', '/login');

   
    cy.get('input[name="email"]').type('Приклад');
    cy.get('input[name="password"]').type('Приклад');
describe('Login Flow E2E', () => {
  it('should login successfully', () => {
  cy.visit('http://localhost:4200/items');
  
     
      cy.contains('Новини IT');
  
   
      cy.get('a[href="/login"]').click();
  
  
      cy.url().should('include', '/login');
  
      cy.get('input[name="email"]').type('Приклад');
      cy.get('input[name="password"]').type('Приклад');
  
      cy.get('button[type="submit"]').click();
  
      cy.url().should('eq', 'http://localhost:4200/items');
      
      cy.contains('Вихід').should('be.visible');
  });
});
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:4200/items');
    
    cy.contains('Вихід').should('be.visible');
  });
});