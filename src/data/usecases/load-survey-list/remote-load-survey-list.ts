import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { UnexpectedError } from '@/domain/errors'
import { HttpStatusCode, HttpGetClient } from '@/data/protocols/http'

export class RemoteLoadSurveryList implements LoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveryList.Model[]>) {
    this.url = url
    this.httpGetClient = httpGetClient
  }

  async loadAll (): Promise<LoadSurveyList.Model[] > {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.noContent: return []
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveryList {
  export type Model = LoadSurveyList.Model
}
