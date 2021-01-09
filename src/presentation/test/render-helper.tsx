import React from 'react'
import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { MutableSnapshot, RecoilRoot, RecoilState, Snapshot } from 'recoil'
import { MemoryHistory } from 'history'

import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { currentAccountState } from '../components'

type Params = {
  Component: React.FC
  history: MemoryHistory
  account?: AccountModel
  states?: Array<{ atom: RecoilState<any>, value: any }>
}

type Result = {
  setCurrentAccountMock: (account: AccountModel) => void
}

export const renderWithHistory = ({ Component, history, account = mockAccountModel(), states = [] }: Params): Result => {
  const setCurrentAccountMock = jest.fn()

  const mockedState = { setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => account }

  const initializeState = ({ set }: MutableSnapshot): void => {
    [...states, { atom: currentAccountState, value: mockedState }].map(state => set(state.atom, state.value))
  }

  render(
    <RecoilRoot initializeState={initializeState}>
      <Router history={history}>
        <Component />
      </Router>
    </RecoilRoot>
  )
  return {
    setCurrentAccountMock
  }
}
