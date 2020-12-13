import { testInputStatus, typeInput } from './../support/form-helper'

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

  it('should show error state if form is invalid', () => {
    typeInput('name', faker.random.alphaNumeric(3))
    testInputStatus('name', 'Campo com número de caracteres abaixo do mínimo requerido.')
    typeInput('email', faker.random.word())
    testInputStatus('email', 'E-mail inválido.')
    typeInput('password', faker.random.alphaNumeric(3))
    testInputStatus('password', 'Campo com número de caracteres abaixo do mínimo requerido.')
    typeInput('passwordConfirmation', faker.random.alphaNumeric(4))
    testInputStatus('passwordConfirmation', 'Campo inválido')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should show valid state if form is valid', () => {
    typeInput('name', faker.name.findName())
    typeInput('email', faker.internet.email())
    const password = faker.random.alphaNumeric(5)
    typeInput('password', password)
    typeInput('passwordConfirmation', password)
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
})
