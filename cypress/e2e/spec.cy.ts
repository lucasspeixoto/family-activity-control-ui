describe('Famili Activity Control e2e Testing', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('app is running');
  });
});
