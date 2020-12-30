import React from 'react'
import { Router } from 'react-router-dom'

import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import '@testing-library/jest-dom/extend-expect'

import Signup from './signup'
import { populateField, ValidationStub, AddAccountSpy, UpdateCurrentAccountMock } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
  updateCurrentAccountMock: UpdateCurrentAccountMock
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()
  const updateCurrentAccountMock = new UpdateCurrentAccountMock()
  const sut = render(
    <Router history={history}>
      <Signup
        validation={validationStub}
        addAccount={addAccountSpy}
        updateCurrentAccount={updateCurrentAccountMock}
      />
    </Router>
  )
  return {
    sut,
    addAccountSpy,
    updateCurrentAccountMock
  }
}

const simulateValidSubmit = async (sut: RenderResult, name = faker.name.findName(), email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  populateField(sut, 'name', name)
  populateField(sut, 'email', email)
  populateField(sut, 'password', password)
  populateField(sut, 'passwordConfirmation', password)
  fireEvent.submit(sut.getByTestId('form'))
  await waitFor(() => sut.getByTestId('form'))
}

describe('SignUp', () => {
  test('Should start with initial state', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    expect(sut.queryByTestId('spinner')).not.toBeInTheDocument()
    expect(sut.getByTestId('submit')).toBeDisabled()
    expect(sut.getByTestId('name').title).toBe(validationError)
    expect(sut.getByTestId('email').title).toBe(validationError)
    expect(sut.getByTestId('password').title).toBe(validationError)
    expect(sut.getByTestId('passwordConfirmation').title).toBe(validationError)
  })

  test('Should show name error if Validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateField(sut, 'name')
    expect(sut.getByTestId('name').title).toBe(validationError)
  })

  test('Should show email error if Validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateField(sut, 'email')
    expect(sut.getByTestId('email').title).toBe(validationError)
  })

  test('Should show password error if Validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateField(sut, 'password')
    expect(sut.getByTestId('password').title).toBe(validationError)
  })

  test('Should show passwordConfirmation error if Validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateField(sut, 'passwordConfirmation')
    expect(sut.getByTestId('passwordConfirmation').title).toBe(validationError)
  })

  test('Should show valid state if Validation succeeds', async () => {
    const { sut } = makeSut()
    populateField(sut, 'name')
    populateField(sut, 'email')
    populateField(sut, 'password')
    populateField(sut, 'passwordConfirmation')
    expect(sut.queryByTestId('main-error')).toBe(null)
  })

  test('Should enable submit button if form is valid', async () => {
    const { sut } = makeSut()
    populateField(sut, 'name')
    populateField(sut, 'email')
    populateField(sut, 'password')
    populateField(sut, 'passwordConfirmation')
    expect(sut.getByTestId('submit')).not.toBeDisabled()
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    simulateValidSubmit(sut)
    expect(sut.getByTestId('spinner')).toBeInTheDocument()
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(sut, name, email, password)
    expect(addAccountSpy.params).toEqual({ name, email, password, passwordConfirmation: password })
  })

  test('Should call AddAccount only once', async () => {
    const { sut, addAccountSpy } = makeSut()
    simulateValidSubmit(sut)
    simulateValidSubmit(sut)
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('Should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, addAccountSpy } = makeSut({ validationError })
    await simulateValidSubmit(sut)
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should show error if AddAccount fails', async () => {
    const { sut, addAccountSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit(sut)
    expect((await sut.findByTestId('main-error')).textContent).toBe(error.message)
    expect(sut.queryByTestId('spinner')).not.toBeInTheDocument()
  })

  test('Should call UpdateCurrentAccount on AddAccount success', async () => {
    const { sut, addAccountSpy, updateCurrentAccountMock } = makeSut()
    await simulateValidSubmit(sut)
    expect(updateCurrentAccountMock.account).toEqual(addAccountSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should show error if UpdateCurrentAccount fails', async () => {
    const { sut, updateCurrentAccountMock } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(updateCurrentAccountMock, 'save').mockRejectedValueOnce(error)
    await simulateValidSubmit(sut)
    expect(sut.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(sut.queryByTestId('spinner')).not.toBeInTheDocument()
  })

  test('Should go to login page', async () => {
    const { sut } = makeSut()
    fireEvent.click(sut.getByTestId('login-link'))
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })
})
