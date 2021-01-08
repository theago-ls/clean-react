import React from 'react'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadSurveyListSpy, mockAccountModel } from '@/domain/test'
import { SurveyList } from '@/presentation/pages'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ApiContext } from '@/presentation/contexts'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/signup'] })
  const setCurrentAccountMock = jest.fn()

  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
      <Router history={history}>
        <SurveyList loadSurveyList={loadSurveyListSpy} />{' '}
      </Router>
    </ApiContext.Provider>
  )

  return {
    loadSurveyListSpy,
    history,
    setCurrentAccountMock
  }
}

describe('SurveyList Component', () => {
  test('should present 4 empty item on start', async () => {

  })
})
