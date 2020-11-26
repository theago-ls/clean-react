import { AuthenticationParams } from '@/domain/usecases/authentication'
import faker from 'faker'

export const mockAuthenticaction = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
