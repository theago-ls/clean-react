import faker from 'faker'

export const mockInvalidCredentialsError = (url: string): void => {
  cy.intercept(
    url,
    (req) => {
      req.reply(401, {
        error: {
          message: faker.random.words()
        }
      })
    }
  ).as('request')
}

export const mockUnexpectedError = (url: string): void => {
  cy.intercept(
    url,
    (req) => {
      req.reply(faker.helpers.randomize([400, 404, 500]), {
        error: {
          message: faker.random.words()
        }
      })
    }
  ).as('request')
}

export const mockOk = (url: string, response: object): void => {
  cy.intercept(
    url,
    (req) => {
      req.reply(200, response)
    }
  ).as('request')
}
