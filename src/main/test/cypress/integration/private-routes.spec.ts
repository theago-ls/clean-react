import { testUrl } from '../utils/helpers'

describe('Private Routes', () => {
  it('should logout on empty token', () => {
    cy.visit('')
    testUrl('/login')
  })
})
