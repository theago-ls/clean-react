import React from 'react'
import { Login } from '@/presentation/pages'
import '@testing-library/jest-dom/extend-expect'
import faker from 'faker'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import { ValidationStub } from '@/presentation/test/validation'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = faker.random.words()
  const sut = render(<Login validation={validationStub} />)
  return {
    sut,
    validationStub
  }
}

describe('Login page', () => {
  test('Should start with initial state', async () => {
    const { sut, validationStub } = makeSut()
    expect(sut.queryByTestId('spinner')).not.toBeInTheDocument()
    expect(sut.getByTestId('submit')).toBeDisabled()
    expect(sut.getByTestId('email').title).toBe(validationStub.errorMessage)
    expect(sut.getByTestId('password').title).toBe(validationStub.errorMessage)
  })

  test('Should show email error if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    const email = faker.internet.email()
    fireEvent.input(sut.getByTestId('email'), { target: { value: email } })
    // expect(sut.getByTestId('main-error').title).toBe(validationStub.errorMessage)
  })

  test('Should show valid state if Validation succeeds', async () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = null
    const email = faker.internet.email()
    const password = faker.internet.password()
    fireEvent.input(sut.getByTestId('email'), { target: { value: email } })
    fireEvent.input(sut.getByTestId('email'), { target: { value: password } })
    expect(sut.queryByTestId('main-error')).toBe(null)
  })

  test('Should enable submit button if form is valid', async () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = null
    const email = faker.internet.email()
    const password = faker.internet.password()
    fireEvent.input(sut.getByTestId('email'), { target: { value: email } })
    fireEvent.input(sut.getByTestId('email'), { target: { value: password } })
    expect(sut.getByTestId('submit')).not.toBeDisabled()
  })
})
