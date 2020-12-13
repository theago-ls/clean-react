import { testInputStatus, testMainError, testUrl, typeInput, testLocalStorageItem } from './../support/form-helper'
import { mockEmailInUseError, mockUnexpectedError, mockInvalidProperty, mockOk } from './../support/signup-mocks'

import faker from 'faker'
import { type } from 'cypress/types/jquery'

const simulateValidSubmit = (): void => {
  typeInput('name', faker.random.alphaNumeric(5))
  typeInput('email', faker.internet.email())
  const password = faker.random.alphaNumeric(5)
  typeInput('password', password)
  typeInput('passwordConfirmation', password)
  cy.getByTestId('submit').click()
}

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
    typeInput('name', faker.random.alphaNumeric(5))
    typeInput('email', faker.internet.email())
    const password = faker.random.alphaNumeric(5)
    typeInput('password', password)
    typeInput('passwordConfirmation', password)
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should show EmailInUseError if email already registered is provided', () => {
    mockEmailInUseError()
    simulateValidSubmit()
    testMainError('E-mail já cadastrado anteriormente.')
    testUrl('/signup')
  })

  it('should show UnexpectedError on any error', () => {
    mockUnexpectedError()
    simulateValidSubmit()
    testMainError('Algo de errado aconteceu. Tente novamente mais tarde')
    testUrl('/signup')
  })

  it('should show UnexpectedError if invalid data is returned', () => {
    mockInvalidProperty()
    simulateValidSubmit()
    testMainError('Algo de errado aconteceu. Tente novamente mais tarde')
    testUrl('/signup')
  })

  it('should save accessToken if valid credentials are provided', () => {
    mockOk()
    simulateValidSubmit()
    testUrl('/')
    testLocalStorageItem('accessToken')
  })

  it('should submit if users type enter on input', () => {
    mockInvalidProperty()
    typeInput('name', faker.random.alphaNumeric(5))
    typeInput('email', faker.internet.email())
    const password = faker.random.alphaNumeric(5)
    typeInput('password', password)
    cy.getByTestId('passwordConfirmation').focus().type(password).type('{enter}')
    testMainError('Algo de errado aconteceu. Tente novamente mais tarde')
    testUrl('/signup')
  })

  it('should not call submit if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    testUrl('/signup')
  })
})
