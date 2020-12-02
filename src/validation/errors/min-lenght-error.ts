export class MinLengthError extends Error {
  constructor () {
    super('Campo com número de caracteres abaixo do mínimo requerido.')
    this.name = 'MinLengthError'
  }
}
