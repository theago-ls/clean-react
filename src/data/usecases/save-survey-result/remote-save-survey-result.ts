import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { RemoteSurveyResultModel } from '@/data/models/remote-survey-result-model'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { SaveSurveyResult } from '@/domain/usecases'

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSaveSurveyResult.Model>
  ) {}

  async save (params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    const httpResponse = await this.httpClient.request({ url: this.url, method: 'put', body: params })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse?.body ? { ...httpResponse.body, date: new Date(httpResponse.body.date) } : null
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel
}
