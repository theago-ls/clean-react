import { UnexpectedError } from '@/domain/errors'
import { HttpStatusCode, HttpGetClient } from '@/data/protocols/http'

export class RemoteLoadSurveryList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient) {
    this.url = url
    this.httpGetClient = httpGetClient
  }

  async loadAll (): Promise<void > {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: break
      default: throw new UnexpectedError()
    }
  }
}
