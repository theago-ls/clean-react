import { HttpMethod } from './../protocols/http/http-client'
import { HttpRequest, HttpClient, HttpResponse, HttpStatusCode } from '@/data/protocols/http'
import faker from 'faker'

export const mockHttpRequest = (method: HttpMethod = faker.random.arrayElement(['get', 'post', 'put', 'delete'])): HttpRequest => ({
  url: faker.internet.url(),
  method,
  body: faker.random.objectElement(),
  headers: faker.random.objectElement()
})

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string
  method?: string
  body?: any
  headers?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async request (data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url
    this.method = data.method
    this.body = data.body
    this.headers = data.headers
    return await Promise.resolve(this.response)
  }
}
