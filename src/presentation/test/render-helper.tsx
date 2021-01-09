import React from 'react'
import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import { MemoryHistory } from 'history'

import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { currentAccountState } from '../components'

type Params = {
  Component: React.FC
  history: MemoryHistory
  account?: AccountModel
}

type Result = {
  setCurrentAccountMock: (account: AccountModel) => void
}

export const renderWithHistory = ({ Component, history, account = mockAccountModel() }: Params): Result => {
  const setCurrentAccountMock = jest.fn()

  const mockedState = { setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => account }

  render(
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, mockedState)}>
      <Router history={history}>
        <Component />
      </Router>
    </RecoilRoot>
  )
  return {
    setCurrentAccountMock
  }
}
