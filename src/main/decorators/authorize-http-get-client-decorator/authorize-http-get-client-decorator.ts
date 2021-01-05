import { GetStorage } from '@/data/protocols/cache/get-storage'
import { HttpGetClient, HttpGetParams, HttpResponse } from '@/data/protocols/http'

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor (
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient
  ) {

  }

  async get (params: HttpGetParams): Promise<HttpResponse> {
    this.getStorage.get('account')
    await this.httpGetClient.get(params)
    return null
  }
}