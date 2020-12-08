describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('should load with correct initial state', () => {
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
})
