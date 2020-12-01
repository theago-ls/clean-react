import { RequiredFieldError } from '@/validation/errors'
import { RequiredFieldValidation } from './required-field-validations'
import faker from 'faker'

describe('RequiredFieldValidation', () => {
  test('should return error if field is empty', () => {
    const sut = new RequiredFieldValidation('email')
    expect(sut.validate('')).toEqual(new RequiredFieldError())
  })

  test('should return falsy if field is not empty', () => {
    const sut = new RequiredFieldValidation('email')
    expect(sut.validate(faker.internet.email())).toBeFalsy()
  })
})
