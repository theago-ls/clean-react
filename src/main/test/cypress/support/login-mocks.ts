import faker from 'faker'
import * as Http from './http-mock'

export const mockInvalidCredentialsError = (): void => Http.mockUnauthorizedError('/login')
export const mockUnexpectedError = (): void => Http.mockServerError('/login')
export const mockOk = (): void => Http.mockOk('/login', { accessToken: faker.random.uuid(), name: faker.name.findName() })
