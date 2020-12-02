import { EmailError } from '@/validation/errors'
import { EmailValidation } from '@/validation/validators'
import faker from 'faker'

const makeSut = (): EmailValidation => new EmailValidation('email')

describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const sut = makeSut()
    expect(sut.validate('')).toEqual(new EmailError('E-mail inválido.'))
  })

  test('should return falsy if email is valid', () => {
    const sut = makeSut()
    expect(sut.validate(faker.internet.email())).toBeFalsy()
  })
})
