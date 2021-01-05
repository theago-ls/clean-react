import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AccessDeniedError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'

type CallbackType = (error: Error) => void
type ResultType = CallbackType

export const useErrorHandler = (callback: CallbackType): ResultType => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)

  return (err: Error): void => {
    if (err instanceof AccessDeniedError) {
      setCurrentAccount(undefined)
      history.replace('/login')
    } else {
      callback(err)
    }
  }
}
