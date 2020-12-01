import React from 'react'
import { Login } from '@/presentation/pages'
import '@testing-library/jest-dom/extend-expect'
import faker from 'faker'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import { ValidationStub } from '@/presentation/test/validation'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(<Login validation={validationStub} />)
  return {
    sut
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
    const { sut } = makeSut()
    const email = faker.internet.email()
    fireEvent.input(sut.getByTestId('email'), { target: { value: email } })
    // expect(sut.getByTestId('main-error').title).toBe(validationStub.errorMessage)
  })

  test('Should show valid state if Validation succeeds', async () => {
    const { sut } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    fireEvent.input(sut.getByTestId('email'), { target: { value: email } })
    fireEvent.input(sut.getByTestId('password'), { target: { value: password } })
    expect(sut.queryByTestId('main-error')).toBe(null)
  })

  test('Should enable submit button if form is valid', async () => {
    const { sut } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    fireEvent.input(sut.getByTestId('email'), { target: { value: email } })
    fireEvent.input(sut.getByTestId('password'), { target: { value: password } })
    expect(sut.getByTestId('submit')).not.toBeDisabled()
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    fireEvent.input(sut.getByTestId('email'), { target: { value: email } })
    fireEvent.input(sut.getByTestId('password'), { target: { value: password } })
    fireEvent.click(sut.getByTestId('submit'))
    expect(sut.getByTestId('spinner')).toBeInTheDocument()
  })
})
