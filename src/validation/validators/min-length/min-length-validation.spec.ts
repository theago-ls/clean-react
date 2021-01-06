import { MinLengthError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'
import faker from 'faker'

const makeSut = (field, minLenght: number): MinLengthValidation => new MinLengthValidation(field, minLenght)

describe('MinLengthValidation', () => {
  test('should return error if value is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field, 5)
    expect(sut.validate({ [field]: faker.random.alphaNumeric(3) })).toEqual(new MinLengthError())
  })

  test('should return falsy if value is valid', () => {
    const field = faker.database.column()

    const sut = makeSut(field, 5)
    expect(sut.validate({ [field]: faker.random.alphaNumeric(5) })).toBeFalsy()
  })

  test('should return falsy if field does not exists in schema', () => {
    const sut = makeSut('any_field', 5)
    expect(sut.validate({ invalidField: faker.random.alphaNumeric(5) })).toBeFalsy()
  })
})
