import { HttpGetClientSpy } from '@/data/test'
import { RemoteLoadSurveyResult } from './remote-load-survey-result'
import faker from 'faker'

describe('RemoteLoadSurveyResult', () => {
  test('should call HttpGetClient with correct URL', () => {
    const url = faker.internet.url()
    const httpGetClientSpy = new HttpGetClientSpy()
    const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy)
    sut.load()
    expect(httpGetClientSpy.url).toBe(url)
  })
})
