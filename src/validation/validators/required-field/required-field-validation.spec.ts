import { RequiredFieldError } from '@/validation/errors'
import { RequiredFieldValidation } from './required-field-validation'
import faker from 'faker'

const makeSut = (field: string): RequiredFieldValidation => new RequiredFieldValidation(field)

describe('RequiredFieldValidation', () => {
  test('should return error if field is empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    expect(sut.validate({ [field]: '' })).toEqual(new RequiredFieldError())
  })

  test('should return falsy if field is not empty', () => {
    const field = faker.database.column()

    const sut = makeSut(field)
    expect(sut.validate({ [field]: faker.random.word() })).toBeFalsy()
  })
})
