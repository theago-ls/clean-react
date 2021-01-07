import { HttpGetClient } from '@/data/protocols/http/http-get-client'
export class RemoteLoadSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async load (): Promise<void> {
    await this.httpGetClient.get({ url: this.url })
  }
}
