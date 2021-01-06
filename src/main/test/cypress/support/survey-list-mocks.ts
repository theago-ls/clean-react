import * as Http from './http-mock'

export const mockUnexpectedError = (): void => Http.mockServerError('/surveys')
