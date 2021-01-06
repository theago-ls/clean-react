import { testUrl } from './../support/helpers'

describe('Private Routes', () => {
  it('should logout on empty token', () => {
    cy.visit('')
    testUrl('/login')
  })
})
