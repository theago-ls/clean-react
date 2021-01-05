import { makeSignUpValidation } from './signup-validation-factory'
import { RequiredFieldValidation, CompareFieldsValidation, MinLengthValidation, EmailValidation, ValidationComposite } from '@/validation/validators'

describe('SignupValidationFactory', () => {
  test('should compose ValidationComposite with correct validations', () => {
    expect(makeSignUpValidation()).toEqual(ValidationComposite.build([
      new RequiredFieldValidation('name'),
      new MinLengthValidation('name', 5),
      new RequiredFieldValidation('email'),
      new EmailValidation('email'),
      new RequiredFieldValidation('password'),
      new MinLengthValidation('password', 5),
      new RequiredFieldValidation('passwordConfirmation'),
      new CompareFieldsValidation('passwordConfirmation', 'password')
    ]))
  })
})
