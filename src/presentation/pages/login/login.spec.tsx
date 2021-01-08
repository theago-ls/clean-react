import { InvalidCredentialsError } from '@/domain/errors'
import { AuthenticationSpy } from '@/domain/test'
import { Authentication } from '@/domain/usecases'
import { ApiContext } from '@/presentation/contexts'
import { Login } from '@/presentation/pages'
import { populateField, ValidationStub } from '@/presentation/test'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import faker from 'faker'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: Authentication.Model) => void
}

type SutParams = {
  validationError: string
}

const simulateValidSubmit = async (email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  populateField('email', email)
  populateField('password', password)
  fireEvent.submit(screen.getByTestId('form'))
  await waitFor(() => screen.getByTestId('form'))
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const setCurrentAccountMock = jest.fn()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <Login validation={validationStub} authentication={authenticationSpy}
        />
      </Router>
    </ApiContext.Provider>
  )
  return {
    authenticationSpy,
    setCurrentAccountMock
  }
}

describe('Login page', () => {
  test('Should start with initial state', async () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
    expect(screen.getByTestId('submit')).toBeDisabled()
    expect(screen.getByTestId('email')).toHaveAttribute('title', validationError)
    expect(screen.getByTestId('password')).toHaveAttribute('title', validationError)
  })

  test('Should show email error if Validation fails', async () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateField('email')
    expect(screen.getByTestId('email')).toHaveAttribute('title', validationError)
  })

  test('Should show valid state if Validation succeeds', async () => {
    makeSut()
    populateField('email')
    populateField('password')
    expect(screen.queryByTestId('main-error')).not.toBeInTheDocument()
  })

  test('Should enable submit button if form is valid', async () => {
    makeSut()
    populateField('email')
    populateField('password')
    expect(screen.getByTestId('submit')).not.toBeDisabled()
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  test('Should call authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('Should call authentication only once', async () => {
    const { authenticationSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should show error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
  })

  test('Should call  UpdateCurrentAccount on Authentication success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit()
    expect(setCurrentAccountMock).toHaveBeenLastCalledWith(authenticationSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should go to signup page', async () => {
    makeSut()
    fireEvent.click(screen.getByTestId('signup-link'))
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/signup')
  })
})
