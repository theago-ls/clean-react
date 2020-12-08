import { EmailError } from '@/validation/errors'
import { EmailValidation } from '@/validation/validators'
import faker from 'faker'

const makeSut = (field: string): EmailValidation => new EmailValidation(field)

describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    expect(sut.validate({ [field]: faker.random.word() })).toEqual(new EmailError('E-mail inválido.'))
  })

  test('should return falsy if email is valid', () => {
    const field = faker.database.column()

    const sut = makeSut(field)
    expect(sut.validate({ [field]: faker.internet.email() })).toBeFalsy()
  })

  test('should return falsy if email is empty', () => {
    const field = faker.database.column()

    const sut = makeSut(field)
    expect(sut.validate({ [field]: '' })).toBeFalsy()
  })
})
