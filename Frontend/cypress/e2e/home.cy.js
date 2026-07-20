describe('Yummy Home Page', () => {
  it('successfully loads and shows the hero section', () => {
    cy.visit('/');
    cy.contains('A Michelin Experience');
    cy.contains('Art on a');
  });

  it('can navigate to the Menu page', () => {
    cy.visit('/');
    // In a responsive design or with custom cursors, we target the nav link
    // The navbar should contain a link to the menu
    cy.get('a[href="/menu"]').first().click({ force: true });
    
    // Check if we navigated to the menu
    cy.url().should('include', '/menu');
  });
});
