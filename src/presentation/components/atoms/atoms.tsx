import { AccountModel } from '@/domain/models'
import { LoadSurveyResult } from '@/domain/usecases'
import { atom } from 'recoil'

export const currentAccountState = atom({
  key: 'currentAccountState',
  default: {
    getCurrentAccount: null as () => AccountModel,
    setCurrentAccount: null as (account: AccountModel) => void
  }
})
