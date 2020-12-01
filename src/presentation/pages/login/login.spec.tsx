import React from 'react'
import { Login } from '@/presentation/pages'
import '@testing-library/jest-dom/extend-expect'
import faker from 'faker'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import { ValidationStub } from '@/presentation/test/validation'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationStub()
  validationSpy.errorMessage = faker.random.words()
  const sut = render(<Login validation={validationSpy} />)
  return {
    sut,
    validationSpy
  }
}

describe('Login page', () => {
  test('Should start with initial state', async () => {
    const { sut, validationSpy } = makeSut()
    expect(sut.queryByTestId('spinner')).not.toBeInTheDocument()
    expect(sut.getByTestId('submit')).toBeDisabled()
    expect(sut.getByTestId('email').title).toBe(validationSpy.errorMessage)
    expect(sut.getByTestId('password').title).toBe(validationSpy.errorMessage)
  })

  test('Should show email error if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    const email = faker.internet.email()
    fireEvent.input(sut.getByTestId('email'), { target: { value: email } })
    // expect(sut.getByTestId('main-error').title).toBe(validationSpy.errorMessage)
  })
})
