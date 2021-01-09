import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { Header } from '@/presentation/components'
import { renderWithHistory } from '@/presentation/test'
import { fireEvent, screen } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'

type SutTypes = {
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const { setCurrentAccountMock } = renderWithHistory({
    Component: Header,
    history,
    account
  })

  return {
    history,
    setCurrentAccountMock
  }
}

describe('Header', () => {
  test('should call setCurrentAccount with null', () => {
    const { history, setCurrentAccountMock } = makeSut()
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('should render username correctly', () => {
    const account = mockAccountModel()
    makeSut(account)
    expect(screen.getByTestId('username')).toHaveTextContent(account.name)
  })
})
