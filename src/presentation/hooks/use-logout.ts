import { useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { currentAccountState } from './../components/atoms/atoms'

type ResultType = () => void

export const useLogout = (): ResultType => {
  const history = useHistory()
  const { setCurrentAccount } = useRecoilValue(currentAccountState)

  return (): void => {
    setCurrentAccount(undefined)
    history.replace('/login')
  }
}
