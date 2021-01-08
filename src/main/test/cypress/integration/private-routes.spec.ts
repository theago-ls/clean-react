import { testUrl } from '../utils/helpers'

describe('Private Routes', () => {
  it('should logout if survey-list has empty token', () => {
    cy.visit('/')
    testUrl('/login')
  })

  it('should logout if survey-result has empty token', () => {
    cy.visit('/surveys/any_id')
    testUrl('/login')
  })
})
