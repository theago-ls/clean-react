import { MinLengthError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'

describe('MinLengthValidation', () => {
  test('should return error if value is invalid', () => {
    const sut = new MinLengthValidation('field', 5)
    expect(sut.validate('123')).toEqual(new MinLengthError())
  })
})
