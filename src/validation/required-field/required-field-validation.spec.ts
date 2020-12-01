import { RequiredFieldError } from '@/validation/errors'
import { RequiredFieldValidation } from './required-field-validations'
import faker from 'faker'

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation(faker.database.column())

describe('RequiredFieldValidation', () => {
  test('should return error if field is empty', () => {
    const sut = makeSut()
    expect(sut.validate('')).toEqual(new RequiredFieldError())
  })

  test('should return falsy if field is not empty', () => {
    const sut = makeSut()
    expect(sut.validate(faker.internet.email())).toBeFalsy()
  })
})
