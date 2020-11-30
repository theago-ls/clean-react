import React from 'react'
import { render, RenderResult, screen, waitFor } from '@testing-library/react'
import { Login } from '@/presentation/pages'
import '@testing-library/jest-dom/extend-expect'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Login />)
  return {
    sut
  }
}

describe('Login page', () => {
  test('Should start with initial state', async () => {
    const { sut } = makeSut()
    expect(sut.queryByTestId('spinner')).not.toBeInTheDocument()
    expect(sut.getByTestId('submit')).toBeDisabled()
    expect(sut.getByTestId('email').title).toBe('Campo obrigatório')
    expect(sut.getByTestId('password').title).toBe('Campo obrigatório')
  })
})
