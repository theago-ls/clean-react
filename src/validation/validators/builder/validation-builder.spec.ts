import { CompareFieldsValidation } from './../compare-fields/compare-fields-validation'
import { EmailValidation, MinLengthValidation, RequiredFieldValidation, ValidationBuilder as sut } from '@/validation/validators'
import faker from 'faker'

describe('ValidationBuilder', () => {
  test('should return required field validation', () => {
    const fieldName = faker.database.column()
    const validations = sut.field(fieldName).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)])
  })

  test('should return email validation', () => {
    const fieldName = faker.database.column()
    const validations = sut.field(fieldName).email().build()
    expect(validations).toEqual([new EmailValidation(fieldName)])
  })

  test('should return min length validation', () => {
    const fieldName = faker.database.column()
    const minLength = faker.random.number(10)
    const validations = sut.field(fieldName).min(minLength).build()
    expect(validations).toEqual([new MinLengthValidation(fieldName, minLength)])
  })

  test('should return compare fields validation', () => {
    const fieldName = faker.database.column()
    const fieldToCompare = faker.database.column()
    const validations = sut.field(fieldName).sameAs(fieldToCompare).build()
    expect(validations).toEqual([new CompareFieldsValidation(fieldName, fieldToCompare)])
  })

  test('should return a list of validations', () => {
    const fieldName = faker.database.column()
    const minLength = faker.random.number(10)
    const validations = sut.field(fieldName).required().min(minLength).email().build()
    expect(validations).toEqual([new RequiredFieldValidation(fieldName), new MinLengthValidation(fieldName, minLength), new EmailValidation(fieldName)])
  })
})
