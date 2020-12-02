import { EmailError } from '@/validation/errors'
import { EmailValidation } from '@/validation/validators'
import faker from 'faker'

describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const sut = new EmailValidation('email')
    expect(sut.validate('')).toEqual(new EmailError('E-mail inválido.'))
  })

  test('should return falsy if email is valid', () => {
    const sut = new EmailValidation('email')
    expect(sut.validate(faker.internet.email())).toBeFalsy()
  })
})
