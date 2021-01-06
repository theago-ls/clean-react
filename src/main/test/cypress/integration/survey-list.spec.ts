import { mockUnexpectedError, mockAccessDeniedError } from './../support/survey-list-mocks'
import { setLocalStorageItem, getLocalStorageItem, testUrl } from './../support/helpers'
import faker from 'faker'

describe('SurveyList', () => {
  beforeEach(() => {
    setLocalStorageItem('account', {
      accessToken: faker.random.uuid(),
      name: faker.name.findName()
    })
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
