import { AccountModel } from '@/domain/models'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { SetStorage } from '@/data/protocols/cache/set-storage'
import { UpdateCurrentAccount } from '@/domain/usecases/update-current-account'

export class LocalUpdateCurrentAccount implements UpdateCurrentAccount {
  constructor (private readonly setStorage: SetStorage) {}

  async save (account: AccountModel): Promise<void> {
    if (!account) { throw new UnexpectedError() }
    await this.setStorage.set('account', JSON.stringify(account))
  }
}
