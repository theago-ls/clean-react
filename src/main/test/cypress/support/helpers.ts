const baseUrl: string = Cypress.config().baseUrl

export const testUrl = (path: string): void => {
  cy.url().should('eq', `${baseUrl}${path}`)
}

export const testLocalStorageItem = (item: string): void => {
  cy.window().then(window => assert.isOk(window.localStorage.getItem(item)))
}

export const setLocalStorageItem = (key: string, value: object): void => {
  localStorage.setItem(key, JSON.stringify(value))
}
