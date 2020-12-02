import validate from 'validate.js'

export class EmailValidator {
  result: string
  constraints = {
    from: {
      email: true
    }
  }

  constructor (value: string) {
    const obj = value ? validate({ from: value }, this.constraints) : null
    this.result = obj ? 'E-mail inválido.' : ''
  }
}
