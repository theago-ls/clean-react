import faker from 'faker'
import * as Http from './http-mock'

export const mockInvalidCredentialsError = (): void => Http.mockUnauthorizedError('/signup')
export const mockEmailInUseError = (): void => Http.mockForbiddenError('/signup')
export const mockUnexpectedError = (): void => Http.mockServerError('/signup')
export const mockOk = (): void => Http.mockOk('/signup', { accessToken: faker.random.uuid(), name: faker.name.findName() })
