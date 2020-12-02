import { EmailError } from '@/validation/errors'
import { EmailValidation } from '@/validation/validators'

describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const sut = new EmailValidation('email')
    expect(sut.validate('')).toEqual(new EmailError('E-mail inválido.'))
  })
})
