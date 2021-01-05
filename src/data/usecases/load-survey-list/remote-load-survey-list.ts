import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { UnexpectedError } from '@/domain/errors'
import { HttpStatusCode, HttpGetClient } from '@/data/protocols/http'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyList.Model[]>) {
    this.url = url
    this.httpGetClient = httpGetClient
  }

  async loadAll (): Promise<LoadSurveyList.Model[] > {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    const remoteSurveys = httpResponse.body || []

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return remoteSurveys.map((remoteSurvey) => ({ ...remoteSurvey, date: new Date(remoteSurvey.date) }))
      case HttpStatusCode.noContent: return []
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Model = {
    id: string
    question: string
    date: string
    didAnswer: boolean
  }
}
