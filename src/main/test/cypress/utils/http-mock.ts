import { Method } from 'axios'
import faker from 'faker'

export const mockUnauthorizedError = (url: string, method?: string): void => {
  cy.intercept(
    method as Method,
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

export const mockServerError = (url: string, method?: string): void => {
  cy.intercept(
    method as Method,
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

export const mockForbiddenError = (url: string | RegExp): void => {
  cy.intercept(
    {
      url
    },
    (req) => {
      req.reply(403, {
        error: {
          message: faker.random.words()
        }
      })
    }
  ).as('request')
}

export const mockOk = (url: string, response: any, method?: string): void => {
  cy.intercept(
    method as Method,
    url,
    {
      fixture: response,
      statusCode: 200
    }
  ).as('request')
}
