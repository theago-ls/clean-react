import { FieldValidationSpy } from '@/validation/test/mock-field-validation'
import { ValidationComposite } from './validation-composite'
import faker from 'faker'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
  fieldName: string
}

const makeSut = (fieldName: string = faker.database.column()): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]
  const sut = new ValidationComposite(fieldValidationsSpy)

  return {
    sut,
    fieldValidationsSpy,
    fieldName
  }
}

describe('ValidationComposite', () => {
  test('should return error if any validation fails', () => {
    const { sut, fieldValidationsSpy, fieldName } = makeSut()
    const errorMessage = faker.random.words()
    fieldValidationsSpy[0].error = new Error(errorMessage)
    fieldValidationsSpy[1].error = new Error(faker.random.words())
    expect(sut.validate(fieldName, faker.random.words())).toBe(errorMessage)
  })

  test('should return falsy if all validation succeeds', () => {
    const { sut, fieldName } = makeSut()
    expect(sut.validate(fieldName, faker.random.words())).toBeFalsy()
  })
})
