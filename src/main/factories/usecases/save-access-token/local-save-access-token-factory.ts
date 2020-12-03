import { SaveAccessToken } from '@/domain/usecases/save-acess-token'
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory'
import { LocalSaveAccessToken } from '@/data/usecases/save-access-token/local-save-access-token'

export const makeSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter())
}
