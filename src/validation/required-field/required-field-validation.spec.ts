import { RequiredFieldError } from '@/validation/errors'
import { RequiredFieldValidation } from './required-field-validations'

describe('RequiredFieldValidation', () => {
  test('should return error if field is empty', () => {
    const sut = new RequiredFieldValidation('email')
    expect(sut.validate('')).toEqual(new RequiredFieldError())
  })
})
