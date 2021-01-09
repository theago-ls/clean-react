import React from 'react'
import { Router } from 'react-router-dom'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import '@testing-library/jest-dom/extend-expect'
import { RecoilRoot } from 'recoil'

import Signup from './signup'
import { populateField, ValidationStub } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'

import faker from 'faker'
import { AddAccount } from '@/domain/usecases'
import { AddAccountSpy } from '@/domain/test'

type SutTypes = {
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: AddAccount.Model) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()
  const setCurrentAccountMock = jest.fn()
  render(
    <RecoilRoot>
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router history={history}>
          <Signup
            validation={validationStub}
            addAccount={addAccountSpy}
          />
        </Router>
      </ApiContext.Provider>
    </RecoilRoot>
  )
  return {
    addAccountSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = async (name = faker.name.findName(), email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  populateField('name', name)
  populateField('email', email)
  populateField('password', password)
  populateField('passwordConfirmation', password)
  fireEvent.submit(screen.getByTestId('form'))
  await waitFor(() => screen.getByTestId('form'))
}

describe('SignUp', () => {
  test('Should start with initial state', async () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
    expect(screen.getByTestId('submit')).toBeDisabled()
    expect(screen.getByTestId('name').title).toBe(validationError)
    expect(screen.getByTestId('email').title).toBe(validationError)
    expect(screen.getByTestId('password').title).toBe(validationError)
    expect(screen.getByTestId('passwordConfirmation').title).toBe(validationError)
  })

  test('Should show name error if Validation fails', async () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateField('name')
    expect(screen.getByTestId('name')).toHaveAttribute('title', validationError)
  })

  test('Should show email error if Validation fails', async () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateField('email')
    expect(screen.getByTestId('email')).toHaveAttribute('title', validationError)
  })

  test('Should show password error if Validation fails', async () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateField('password')
    expect(screen.getByTestId('password')).toHaveAttribute('title', validationError)
  })

  test('Should show passwordConfirmation error if Validation fails', async () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    populateField('passwordConfirmation')
    expect(screen.getByTestId('passwordConfirmation')).toHaveAttribute('title', validationError)
  })

  test('Should show valid state if Validation succeeds', async () => {
    makeSut()
    populateField('name')
    populateField('email')
    populateField('password')
    populateField('passwordConfirmation')
    expect(screen.queryByTestId('main-error')).not.toBeInTheDocument()
  })

  test('Should enable submit button if form is valid', async () => {
    makeSut()
    populateField('name')
    populateField('email')
    populateField('password')
    populateField('passwordConfirmation')
    expect(screen.getByTestId('submit')).not.toBeDisabled()
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  test('Should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut()
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(name, email, password)
    expect(addAccountSpy.params).toEqual({ name, email, password, passwordConfirmation: password })
  })

  test('Should call AddAccount only once', async () => {
    const { addAccountSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('Should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words()
    const { addAccountSpy } = makeSut({ validationError })
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should show error if AddAccount fails', async () => {
    const { addAccountSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    expect(await screen.findByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
  })

  test('Should call UpdateCurrentAccount on AddAccount success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit()
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })
  test('Should go to login page', async () => {
    makeSut()
    fireEvent.click(screen.getByTestId('login-link'))
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })
})
