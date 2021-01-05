import { Authentication } from '@/domain/usecases'
import { AccountModel } from './../models'
import faker from 'faker'

export const mockAuthenticaction = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid(),
  name: faker.name.findName()
})
