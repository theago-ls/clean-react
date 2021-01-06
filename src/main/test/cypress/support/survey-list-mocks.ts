import * as Http from './http-mock'

export const mockUnexpectedError = (): void => Http.mockServerError('/surveys')
export const mockAccessDeniedError = (): void => Http.mockForbiddenError('/surveys')
