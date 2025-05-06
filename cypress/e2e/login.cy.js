describe('Login Page Test', () => {
  it('should log in with valid credentials and reach the dashboard', () => {
    // Visit the login page
    cy.visit('https://practicetestautomation.com/practice-test-login/');

    // Check the title
    cy.title().should('include', 'Test Login');

    // Enter username and password
    cy.get('#username').type('student');
    cy.get('#password').type('Password123');

    // Click the login button
    cy.get('#submit').click();

    // Assertion to check successful login
    cy.url().should('include', '/logged-in-successfully/');
    cy.get('h1').should('have.text', 'Logged In Successfully');
  });
});
