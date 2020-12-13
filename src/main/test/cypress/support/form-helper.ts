const baseUrl: string = Cypress.config().baseUrl

export const testInputStatus = (field: string, error: string): void => {
  cy.getByTestId(field).should('have.attr', 'title', error)
}

export const typeInput = (field: string, input: string): void => {
  cy.getByTestId(field).focus().type(input)
}

export const testMainError = (error: string): void => {
  cy.getByTestId('error-wrap')
    .getByTestId('spinner').should('not.exist')
    .getByTestId('main-error').should('contains.text', error)
}

export const testUrl = (path: string): void => {
  cy.url().should('eq', `${baseUrl}${path}`)
}

export const testLocalStorageItem = (item: string): void => {
  cy.window().then(window => assert.isOk(window.localStorage.getItem(item)))
}
