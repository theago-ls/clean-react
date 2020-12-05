import React from 'react'

import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Signup from './signup'
import { populateField, ValidationStub } from '@/presentation/test'
import faker from 'faker'
import { AddAccountSpy } from '@/presentation/test/mock-add-account'

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()
  const sut = render(
    <Signup
      validation={validationStub}
      addAccount={addAccountSpy}
    />
  )
  return {
    sut,
    addAccountSpy
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
    const passwordConfirmation = password
    simulateValidSubmit(sut, name, email, password)
    expect(addAccountSpy.params).toEqual({ name, email, password, passwordConfirmation: password })
  })
})
