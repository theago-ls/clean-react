import React from 'react'

import { fireEvent, render, RenderResult } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Signup from './signup'
import { populateField, ValidationStub } from '@/presentation/test'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Signup
      validation={validationStub}
    />
  )
  return {
    sut
  }
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
    expect(sut.getByTestId('passwordConfirmation').title).toBe('Campo obrigatório')
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
})
