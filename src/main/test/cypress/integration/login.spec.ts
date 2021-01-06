import faker from 'faker'
import { testInputStatus, testMainError, typeInput } from './../support/form-helpers'
import { testUrl, testLocalStorageItem } from './../support/helpers'
import { mockInvalidCredentialsError, mockUnexpectedError, mockOk } from '../support/login-mocks'

const simulateValidSubmit = (): void => {
  typeInput('email', faker.internet.email())
  typeInput('password', faker.random.alphaNumeric(5))
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
    typeInput('email', faker.random.word())
    testInputStatus('email', 'E-mail inválido.')
    typeInput('password', faker.random.alphaNumeric(3))
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

  it('should save account if valid credentials are provided', () => {
    mockOk()
    simulateValidSubmit()
    testUrl('/')
    testLocalStorageItem('account')
  })

  it('should show UnexpectedError on 400', () => {
    mockUnexpectedError()
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
    mockUnexpectedError()
    typeInput('email', faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5)).type('{enter}')
    testMainError('Algo de errado aconteceu. Tente novamente mais tarde')
    testUrl('/login')
  })

  it('should not call submit if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    testUrl('/login')
  })
})
