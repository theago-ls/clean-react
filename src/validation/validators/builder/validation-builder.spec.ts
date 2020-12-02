import { EmailValidation, MinLengthValidation, RequiredFieldValidation, ValidationBuilder as sut } from '@/validation/validators'
import faker from 'faker'

describe('ValidationBuilder', () => {
  test('should return required field validation', () => {
    const validations = sut.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })

  test('should return email validation', () => {
    const validations = sut.field('any_field').email().build()
    expect(validations).toEqual([new EmailValidation('any_field')])
  })

  test('should return min length validation', () => {
    const minLength = faker.random.number(10)
    const validations = sut.field('any_field').min(minLength).build()
    expect(validations).toEqual([new MinLengthValidation('any_field', minLength)])
  })
})
