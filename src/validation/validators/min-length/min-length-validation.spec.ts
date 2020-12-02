import { MinLengthError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'
import faker from 'faker'

const makeSut = (minLenght: number): MinLengthValidation => new MinLengthValidation(faker.database.column(), minLenght)

describe('MinLengthValidation', () => {
  test('should return error if value is invalid', () => {
    const sut = makeSut(5)
    expect(sut.validate('123')).toEqual(new MinLengthError())
  })

  test('should return falsy if value is valid', () => {
    const sut = makeSut(5)
    expect(sut.validate('12345')).toBeFalsy()
  })
})
