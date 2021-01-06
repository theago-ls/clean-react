import { AccessDeniedError } from '@/domain/errors'
import { useLogout } from '@/presentation/hooks'

type CallbackType = (error: Error) => void
type ResultType = CallbackType

export const useErrorHandler = (callback: CallbackType): ResultType => {
  const logout = useLogout()

  return (err: Error): void => {
    if (err instanceof AccessDeniedError) {
      logout()
    } else {
      callback(err)
    }
  }
}
