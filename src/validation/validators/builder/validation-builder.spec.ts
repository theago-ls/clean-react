import { EmailValidation, RequiredFieldValidation, ValidationBuilder as sut } from '@/validation/validators'

describe('ValidationBuilder', () => {
  test('should return required field validation', () => {
    const validations = sut.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })

  test('should return email validation', () => {
    const validations = sut.field('any_field').email().build()
    expect(validations).toEqual([new EmailValidation('any_field')])
  })
})
