import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Login } from '@/presentation/pages'
import '@testing-library/jest-dom/extend-expect'

describe('Login page', () => {
  test('Should start with initial state', async () => {
    render(<Login />)
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
    expect(screen.getByTestId('submit')).toBeDisabled()
    expect(screen.getByTestId('email').title).toBe('Campo obrigatório')
    expect(screen.getByTestId('password').title).toBe('Campo obrigatório')
  })
})
