import { GetStorage } from '@/data/protocols/cache/get-storage'
import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http'

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor (
    private readonly getStorage: GetStorage,
    private readonly httpClient: HttpClient
  ) {

  }

  async request (data: HttpRequest): Promise<HttpResponse> {
    const account = this.getStorage.get('account')
    if (account?.accessToken) {
      data = {
        ...data,
        headers: {
          ...data.headers,
          'x-access-token': account.accessToken
        }
      }
    }
    const httpResponse = await this.httpClient.request(data)
    return httpResponse
  }
}
