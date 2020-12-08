import { makeSignUpValidation } from './signup-validation-factory'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

describe('SignupValidationFactory', () => {
  test('should compose ValidationComposite with correct validations', () => {
    expect(makeSignUpValidation()).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('name').required().min(5).build(),
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(5).build(),
      ...ValidationBuilder.field('passwordConfirmation').required().sameAs('password').build()
    ]))
  })
})
