export class EmailError extends Error {
  constructor (errorMessage: string) {
    super(errorMessage)
    this.name = 'EmailError'
  }
}
