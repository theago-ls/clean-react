import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { SurveyModel } from '@/domain/models'
import { UnexpectedError } from '@/domain/errors'
import { HttpStatusCode, HttpGetClient } from '@/data/protocols/http'

export class RemoteLoadSurveryList implements LoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<SurveyModel[]>) {
    this.url = url
    this.httpGetClient = httpGetClient
  }

  async loadAll (): Promise<SurveyModel[] > {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.noContent: return []
      default: throw new UnexpectedError()
    }
  }
}
