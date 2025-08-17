/**
  - Login spec
    - should display login page correctly
    - should display alert when email is empty
    - should display alert when password is empty
    - should display alert when email and password are wrong
    - should display homepage when email and password are correct
 */
describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Email"]').type('akun2@gmail.com');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email and password are wrong', () => {
    cy.get('input[placeholder="Email"]').type('testuser@gmail.com');

    cy.get('input[placeholder="Password"]').type('wrong_password');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when email and password are correct', () => {
    cy.get('input[placeholder="Email"]').type('akun2@gmail.com');

    cy.get('input[placeholder="Password"]').type('123123');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.get('nav')
      .contains(/^Sign Out$/)
      .should('be.visible');
  });
});
