import { HttpGetClientSpy } from '@/data/test'
import { RemoteLoadSurveryList } from './remote-load-survey-list'
import faker from 'faker'

describe('RemoteLoadSurveyList', () => {
  test('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const httpGetClientSpy = new HttpGetClientSpy()
    const sut = new RemoteLoadSurveryList(url, httpGetClientSpy)
    await sut.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  })
})
