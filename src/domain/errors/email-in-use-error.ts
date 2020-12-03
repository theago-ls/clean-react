export class EmailInUseError extends Error {
  constructor () {
    super('E-mail já cadastrado anteriormente.')
    this.name = 'EmailInUseError'
  }
}
