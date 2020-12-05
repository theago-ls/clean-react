import React from 'react'

import { render, RenderResult } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Signup from './signup'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(
    <Signup />
  )
  return {
    sut
  }
}

describe('SignUp', () => {
  test('Should start with initial state', async () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut()
    expect(sut.queryByTestId('spinner')).not.toBeInTheDocument()
    expect(sut.getByTestId('submit')).toBeDisabled()
    expect(sut.getByTestId('name').title).toBe(validationError)
    expect(sut.getByTestId('email').title).toBe(validationError)
    expect(sut.getByTestId('password').title).toBe(validationError)
    expect(sut.getByTestId('passwordConfirmation').title).toBe(validationError)
  })
})
