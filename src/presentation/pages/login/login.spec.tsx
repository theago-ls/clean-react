import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import '@testing-library/jest-dom/extend-expect'
import faker from 'faker'
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react'
import { Login } from '@/presentation/pages'
import { ValidationStub, AuthenticationSpy, UpdateCurrentAccountMock, populateField } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  updateCurrentAccountMock: UpdateCurrentAccountMock
}

type SutParams = {
  validationError: string
}

const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  populateField(sut, 'email', email)
  populateField(sut, 'password', password)
  fireEvent.submit(sut.getByTestId('form'))
  await waitFor(() => sut.getByTestId('form'))
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const updateCurrentAccountMock = new UpdateCurrentAccountMock()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router history={history}>
      <Login validation={validationStub} authentication={authenticationSpy}
        updateCurrentAccount={updateCurrentAccountMock}
      />
    </Router>
  )
  return {
    sut,
    authenticationSpy,
    updateCurrentAccountMock
  }
}

describe('Login page', () => {
  test('Should start with initial state', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    expect(sut.queryByTestId('spinner')).not.toBeInTheDocument()
    expect(sut.getByTestId('submit')).toBeDisabled()
    expect(sut.getByTestId('email').title).toBe(validationError)
    expect(sut.getByTestId('password').title).toBe(validationError)
  })

  test('Should show email error if Validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateField(sut, 'email')
    expect(sut.getByTestId('email').title).toBe(validationError)
  })

  test('Should show valid state if Validation succeeds', async () => {
    const { sut } = makeSut()
    populateField(sut, 'email')
    populateField(sut, 'password')
    expect(sut.queryByTestId('main-error')).toBe(null)
  })

  test('Should enable submit button if form is valid', async () => {
    const { sut } = makeSut()
    populateField(sut, 'email')
    populateField(sut, 'password')
    expect(sut.getByTestId('submit')).not.toBeDisabled()
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    simulateValidSubmit(sut)
    expect(sut.getByTestId('spinner')).toBeInTheDocument()
  })

  test('Should call authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('Should call authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()
    simulateValidSubmit(sut)
    simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    await simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should show error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    await simulateValidSubmit(sut)
    expect(sut.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(sut.queryByTestId('spinner')).not.toBeInTheDocument()
  })

  test('Should show error if UpdateCurrentAccount fails', async () => {
    const { sut, updateCurrentAccountMock } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(updateCurrentAccountMock, 'save').mockReturnValueOnce(Promise.reject(error))
    await simulateValidSubmit(sut)
    expect(sut.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(sut.queryByTestId('spinner')).not.toBeInTheDocument()
  })

  test('Should call  UpdateCurrentAccount on Authentication success', async () => {
    const { sut, authenticationSpy, updateCurrentAccountMock } = makeSut()
    await simulateValidSubmit(sut)
    expect(updateCurrentAccountMock.account).toEqual(authenticationSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should go to signup page', async () => {
    const { sut } = makeSut()
    fireEvent.click(sut.getByTestId('signup-link'))
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/signup')
  })
})
