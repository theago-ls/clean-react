import React from 'react'
import { Login } from '@/presentation/pages'
import '@testing-library/jest-dom/extend-expect'
import faker from 'faker'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import { ValidationSpy } from '@/presentation/test/validation'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
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

  test('Should call Validation with correct email', async () => {
    const { sut, validationSpy } = makeSut()
    const email = faker.internet.email()
    fireEvent.input(sut.getByTestId('email'), { target: { value: email } })
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe(email)
  })

  test('Should call Validation with correct password', async () => {
    const { sut, validationSpy } = makeSut()
    const password = faker.internet.password()
    fireEvent.input(sut.getByTestId('password'), { target: { value: password } })
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe(password)
  })
})
