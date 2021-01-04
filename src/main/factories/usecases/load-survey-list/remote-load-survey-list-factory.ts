import { LoadSurveyList } from '@/domain/usecases'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'
import { RemoteLoadSurveryList } from '@/data/usecases/load-survey-list/remote-load-survey-list'

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveryList(makeApiUrl('/surveys'), makeAxiosHttpClient())
}
