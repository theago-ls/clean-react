import validate from 'validate.js'

export class EmailValidator {
  result: string
  constraints = {
    from: {
      email: true
    }
  }

  constructor (value: string) {
    const obj = validate({ from: value }, this.constraints)
    console.log(obj)
    this.result = obj ? 'E-mail inválido.' : ''
  }
}
