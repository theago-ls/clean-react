import { render, screen } from '@testing-library/react'
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { SurveyResult } from '@/presentation/pages'
import { ApiContext } from '@/presentation/contexts'
import { mockAccountModel } from '@/domain/test'

type SutTypes = {

}

const makeSut = (): void => {
  const history = createMemoryHistory({ initialEntries: ['/signup'] })
  const setCurrentAccountMock = jest.fn()

  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
      <Router history={history}>
        <SurveyResult />
      </Router>
    </ApiContext.Provider>
  )
}

describe('SurveyResult Component', () => {
  test('should present correct initial state', async () => {
    makeSut()
    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })
})
