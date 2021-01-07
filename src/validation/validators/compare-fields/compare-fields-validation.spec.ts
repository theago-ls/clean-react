import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'

const makeSut = (field: string, fieldToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(field, fieldToCompare)

describe('CompareFieldsValidation', () => {
  test('should return error if compare is invalid', () => {
    const field = 'any_field'
    const fieldToCompare = 'another_field'
    const sut = makeSut(field, fieldToCompare)
    expect(sut.validate({
      [field]: 'any_value',
      [fieldToCompare]: 'other_value'
    })).toEqual(new InvalidFieldError())
  })

  test('should return falsy if compare is valid', () => {
    const field = 'any_field'
    const fieldToCompare = 'another_field'
    const value = faker.random.word()
    const sut = makeSut(field, fieldToCompare)
    expect(sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })).toBeFalsy()
  })
})
