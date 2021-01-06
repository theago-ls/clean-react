import { setLocalStorageItem, getLocalStorageItem, testUrl } from '../utils/helpers'
import * as Http from '../utils/http-mock'

const path = '/surveys'
const mockUnexpectedError = (): void => Http.mockServerError(path)
const mockAccessDeniedError = (): void => Http.mockForbiddenError(path)

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => setLocalStorageItem('account', account))
  })
  it('should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente mais tarde')
  })

  it('should logout on AccessDeniedError', () => {
    mockAccessDeniedError()
    cy.visit('')
    testUrl('/login')
  })

  it('should present correct username', () => {
    mockUnexpectedError()
    const account = getLocalStorageItem('account')
    cy.visit('')
    cy.getByTestId('username').should('contain.text', account.name)
  })

  it('should logout on logout click', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('logout').click()
    testUrl('/login')
  })
})
