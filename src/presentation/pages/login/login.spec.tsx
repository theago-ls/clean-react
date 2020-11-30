import React from 'react'
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react'
import { Login } from '@/presentation/pages'
import '@testing-library/jest-dom/extend-expect'
import { Validation } from '@/presentation/protocols/validation/validation'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage: string
  input: object

  validate (input: object): string {
    this.input = input
    return this.errorMessage
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
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
    expect(sut.getByTestId('email').title).toBe('Campo obrigatório')
    expect(sut.getByTestId('password').title).toBe('Campo obrigatório')
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    fireEvent.input(sut.getByTestId('email'), { target: { value: 'any_email' } })
    expect(validationSpy.input).toEqual({
      email: 'any_email'
    })
  })
})
