import { setLocalStorageItem, getLocalStorageItem, testUrl } from '../utils/helpers'
import * as Http from '../utils/http-mock'

const path = '/surveys'
const mockUnexpectedError = (): void => Http.mockServerError(path)
const mockAccessDeniedError = (): void => Http.mockForbiddenError(path)
const mockSuccess = (): void => Http.mockOk(path, 'survey-list')

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => setLocalStorageItem('account', account))
  })
  it('should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente mais tarde')
  })

  // @TODO: https://github.com/cypress-io/cypress/issues/9302
  // it('should reload on reload button click', () => {
  //   mockUnexpectedError()
  //   cy.visit('')
  //   cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente mais tarde')
  //   mockSuccess()
  //   cy.getByTestId('reload').click()
  //   cy.get('li:not(:empty)').should('have.length', 2)
  // })

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

  it('should present survey items', () => {
    mockSuccess()
    cy.visit('')
    cy.get('li:empty').should('have.length', 4)
    cy.get('li:not(:empty)').should('have.length', 2)
    cy.get('li:nth-child(1)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '03')
      assert.equal(li.find('[data-testid="month"]').text(), 'fev')
      assert.equal(li.find('[data-testid="year"]').text(), '2018')
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 1')
      cy.fixture('icons').then(icon => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbDown)
      })
    })

    cy.get('li:nth-child(2)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '13')
      assert.equal(li.find('[data-testid="month"]').text(), 'nov')
      assert.equal(li.find('[data-testid="year"]').text(), '2019')
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 2')
      cy.fixture('icons').then(icon => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbUp)
      })
    })
  })
})
