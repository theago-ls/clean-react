import faker from 'faker'
import * as Helper from './http-mock'

export const mockInvalidCredentialsError = (): void => Helper.mockInvalidCredentialsError('/signup')
export const mockEmailInUseError = (): void => Helper.mockEmailInUseError('/signup')
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError('/signup')
export const mockOk = (): void => Helper.mockOk('/signup', { accessToken: faker.random.uuid() })
export const mockInvalidProperty = (): void => Helper.mockOk('/signup', { invalidProperty: faker.random.words() })
