import { testInputStatus } from './../support/form-helper'

import faker from 'faker'

describe('Signup', () => {
  beforeEach(() => {
    cy.visit('signup')
  })
  it('should load with correct initial state', () => {
    testInputStatus('name', 'Campo obrigatório')
    testInputStatus('email', 'Campo obrigatório')
    testInputStatus('password', 'Campo obrigatório')
    testInputStatus('passwordConfirmation', 'Campo obrigatório')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
})
