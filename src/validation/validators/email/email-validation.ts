import { EmailValidator } from '@/infra/validators'
import { EmailError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class EmailValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (value: string): Error {
    const validator = new EmailValidator(value)
    return validator.result ? new EmailError(validator.result) : null
  }
}
