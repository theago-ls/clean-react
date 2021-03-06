export const testInputStatus = (field: string, error?: string): void => {
  if (error) {
    cy.getByTestId(field).should('have.attr', 'title', error)
  } else {
    cy.getByTestId(field).should('not.have.attr', 'title')
  }
}

export const typeInput = (field: string, input: string): void => {
  cy.getByTestId(field).focus().type(input)
}

export const testMainError = (error: string): void => {
  cy.getByTestId('error-wrap')
    .getByTestId('spinner').should('not.exist')
    .getByTestId('main-error').should('contains.text', error)
}
