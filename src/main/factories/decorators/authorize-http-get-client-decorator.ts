import { makeAxiosHttpClient } from '@/main/factories/http'
import { makeLocalStorageAdapter } from '@/main/factories/cache'
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'
import { HttpGetClient } from '@/data/protocols/http/http-get-client'

export const makeAuthorizeHttpGetClientDecorator = (): HttpGetClient => {
  return new AuthorizeHttpGetClientDecorator(makeLocalStorageAdapter(), makeAxiosHttpClient())
}
