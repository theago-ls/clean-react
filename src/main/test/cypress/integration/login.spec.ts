import faker from 'faker'
import { testInputStatus, testMainError, testUrl, testLocalStorageItem } from '../support/form-helper'
import { mockInvalidCredentialsError, mockUnexpectedError, mockOk, mockInvalidProperty } from '../support/login-mocks'

const simulateValidSubmit = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
  cy.getByTestId('submit').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('should load with correct initial state', () => {
    testInputStatus('email', 'Campo obrigatório')
    testInputStatus('password', 'Campo obrigatório')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should show error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    testInputStatus('email', 'E-mail inválido.')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    testInputStatus('password', 'Campo com número de caracteres abaixo do mínimo requerido.')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should show valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should show InvalidCredentialsError if invalid credentials are provided', () => {
    mockInvalidCredentialsError()
    simulateValidSubmit()
    testMainError('Credenciais inválidas')
    testUrl('/login')
  })

  it('should save accessToken if valid credentials are provided', () => {
    mockOk()
    simulateValidSubmit()
    testUrl('/')
    testLocalStorageItem('accessToken')
  })

  it('should show UnexpectedError on 400', () => {
    mockUnexpectedError()
    simulateValidSubmit()
    testMainError('Algo de errado aconteceu. Tente novamente mais tarde')
    testUrl('/login')
  })

  it('should show UnexpectedError if invalid data is returned', () => {
    mockInvalidProperty()
    simulateValidSubmit()
    testMainError('Algo de errado aconteceu. Tente novamente mais tarde')
    testUrl('/login')
  })
  // it('should prevent multiple submits', () => {
  //   mockInvalidProperty()
  //   cy.getByTestId('email').focus().type(faker.internet.email())
  //   cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
  //   cy.getByTestId('submit').dblclick()
  //   cy.wait('@request')
  //   cy.get('@request.all').should('have.length', 1)
  // })

  it('should submit if users type enter on input', () => {
    mockInvalidProperty()
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5)).type('{enter}')
    testMainError('Algo de errado aconteceu. Tente novamente mais tarde')
    testUrl('/login')
  })

  it('should not call submit if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    testUrl('/login')
  })
})
