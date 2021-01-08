import { setLocalStorageItem, getLocalStorageItem, testUrl } from '../utils/helpers'
import * as Http from '../utils/http-mock'

// If api path isn't added, Cypress intercepts requests to load page
const path = 'http://fordevs.herokuapp.com/api/surveys'
const mockSuccess = (method: string = 'get'): void => Http.mockOk(path, 'load-survey-result', method)
const mockUnexpectedError = (method: string = 'get'): void => Http.mockServerError(path, method)
const mockAccessDeniedError = (): void => Http.mockForbiddenError(path)

describe('SurveyResult', () => {
  describe('load', () => {
    beforeEach(() => {
      cy.fixture('account').then(account => setLocalStorageItem('account', account))
    })

    it('should present error on UnexpectedError', () => {
      mockUnexpectedError()
      cy.visit('/surveys/any_id')
      cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente mais tarde')
    })

    // @TODO: https://github.com/cypress-io/cypress/issues/9302
    // it('should reload on reload button click', () => {
    //   mockUnexpectedError()
    //   cy.visit('/surveys/any_id')
    //   cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente mais tarde')
    //   mockSuccess()
    //   cy.getByTestId('reload').click()
    //   cy.get('question').should(exist')
    // })

    it('should redirect to Login on AccessDeniedError', () => {
      mockAccessDeniedError()
      cy.visit('/surveys/any_id')
      testUrl('/login')
    })

    it('should present survey result', () => {
      mockSuccess()
      cy.visit('/surveys/any_id')
      cy.getByTestId('question').should('have.text', 'Question')
      cy.getByTestId('day').should('have.text', '03')
      cy.getByTestId('month').should('have.text', '02')
      cy.getByTestId('year').should('have.text', '2018')

      cy.get('li:nth-child(1)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer')
        assert.equal(li.find('[data-testid="percent"]').text(), '70.00%')
        assert.equal(li.find('[data-testid="image"]').attr('src'), 'any_image')
      })

      cy.get('li:nth-child(2)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'another_answer')
        assert.equal(li.find('[data-testid="percent"]').text(), '30.00%')
        assert.notExists(li.find('[data-testid="image"]'))
      })
    })

    it('should redirect to SurveyList on back button click', () => {
      mockSuccess()
      cy.visit('/')
      cy.visit('/surveys/any_id')
      cy.getByTestId('back-button').click()
      testUrl('/')
    })
  })

  describe('save', () => {
    beforeEach(() => {
      cy.fixture('account').then(account => setLocalStorageItem('account', account))
      mockSuccess()
      cy.visit('/surveys/any_id')
    })

    const mockSaveSuccess = (method: string = 'put'): void => Http.mockOk(path, 'save-survey-result', method)

    it('should present error on UnexpectedError', () => {
      mockUnexpectedError('put')
      cy.get('li:nth-child(2)').click()
      cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente mais tarde')
    })

    it('should redirect to Login on AccessDeniedError', () => {
      mockAccessDeniedError()
      cy.get('li:nth-child(2)').click()
      testUrl('/login')
    })

    it('should present survey result', () => {
      mockSaveSuccess()
      cy.get('li:nth-child(2)').click()
      cy.getByTestId('question').should('have.text', 'Other Question')
      cy.getByTestId('day').should('have.text', '15')
      cy.getByTestId('month').should('have.text', '05')
      cy.getByTestId('year').should('have.text', '2019')

      cy.get('li:nth-child(1)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'a_crazy_answer')
        assert.equal(li.find('[data-testid="percent"]').text(), '50.00%')
        assert.equal(li.find('[data-testid="image"]').attr('src'), 'image_all_the_people')
      })

      cy.get('li:nth-child(2)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'another_crazy_answer')
        assert.equal(li.find('[data-testid="percent"]').text(), '50.00%')
        assert.notExists(li.find('[data-testid="image"]'))
      })
    })
  })
})
