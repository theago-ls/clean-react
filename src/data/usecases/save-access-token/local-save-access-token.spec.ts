import { SetStorageMock } from '@/data/test'
import { LocalSaveAccessToken } from './local-save-access-token'
import faker from 'faker'

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorageMock)
  return {
    sut,
    setStorageMock
  }
}

describe('LocalSaveAccessToken', () => {
  test('should call SetSotrage with correct value', async () => {
    const { sut, setStorageMock } = makeSut()
    const accessToken = faker.random.uuid()
    await sut.save(accessToken)
    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(accessToken)
  })

  test('should throws if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut()
    jest.spyOn(setStorageMock, 'set').mockRejectedValue(new Error())
    const promise = sut.save(faker.random.uuid())
    await expect(promise).rejects.toThrow(new Error())
  })
})
