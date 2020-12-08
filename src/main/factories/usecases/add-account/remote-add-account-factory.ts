import { AddAccount } from '@/domain/usecases/add-account'
import { RemoteAddAccount } from '@/data/usecases/add-account/remote-add-account'
import { makeAxiosHttpClient, makeApiUrl } from '@/main/factories/http'

export const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient())
}
