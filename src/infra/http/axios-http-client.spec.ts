import { mockAxios, mockHttpResponse } from '@/infra/test/mock-axios'
import { AxiosHttpClient } from './axios-http-client'
import { mockHttpRequest } from '@/data/test/mock-http'
import axios from 'axios'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  describe('request', () => {
    test('Should call axios with correct values', async () => {
      const { sut, mockedAxios } = makeSut()
      const request = mockHttpRequest('post')
      await sut.request(request)
      expect(mockedAxios.request).toHaveBeenCalledWith({
        url: request.url,
        data: request.body,
        method: request.method,
        headers: request.headers
      })
    })

    test('Should return correct response on axios', async () => {
      const { sut, mockedAxios } = makeSut()
      const httpResponse = await sut.request(mockHttpRequest('post'))
      const axiosResponse = await mockedAxios.request.mock.results[0].value
      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      })
    })

    test('Should return correct error on axios', () => {
      const { sut, mockedAxios } = makeSut()
      mockedAxios.request.mockRejectedValueOnce({
        respose: mockHttpResponse()
      })
      const promise = sut.request(mockHttpRequest('post'))
      expect(promise).toEqual(mockedAxios.request.mock.results[0].value)
    })
  })
})
