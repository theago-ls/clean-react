import { setLocalStorageItem, getLocalStorageItem, testUrl } from '../utils/helpers'
import * as Http from '../utils/http-mock'

// If api path isn't added, Cypress intercepts requests to load page
const path = 'http://fordevs.herokuapp.com/api/surveys'
const mockUnexpectedError = (): void => Http.mockServerError(path)

describe('SurveyResult', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => setLocalStorageItem('account', account))
  })
  it('should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('/surveys/any_id')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente mais tarde')
  })
})
