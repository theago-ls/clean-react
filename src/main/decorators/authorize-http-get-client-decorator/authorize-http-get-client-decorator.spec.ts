import { GetStorageSpy } from '@/data/test/mock-cache'
import { mockGetRequest } from '@/data/test/mock-http'
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'

describe('AuthorizeHttpGetClientDecorator', () => {
  test('should call GetStorage with correct value', () => {
    const getStorageSpy = new GetStorageSpy()
    const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy)
    sut.get(mockGetRequest())
    expect(getStorageSpy.key).toBe('account')
  })
})
