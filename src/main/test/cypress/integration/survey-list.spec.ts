import { mockUnexpectedError } from './../support/survey-list-mocks'
import { setLocalStorageItem } from './../support/helpers'
import faker from 'faker'

describe('SurveyList', () => {
  beforeEach(() => {
    setLocalStorageItem('account', {
      accessToken: faker.random.uuid(),
      name: faker.name.findName()
    })
  })
  it('should present error on UnexpectedError', () => {
    cy.visit('')
    mockUnexpectedError()
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente mais tarde')
  })
})
