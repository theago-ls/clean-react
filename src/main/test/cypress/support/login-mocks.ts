import faker from 'faker'
import * as Helper from './http-mock'

export const mockInvalidCredentialsError = (): void => Helper.mockInvalidCredentialsError('/login')
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError('/login')
export const mockOk = (): void => Helper.mockOk('/login', { accessToken: faker.random.uuid() })
export const mockInvalidProperty = (): void => Helper.mockOk('/login', { invalidProperty: faker.random.words() })
