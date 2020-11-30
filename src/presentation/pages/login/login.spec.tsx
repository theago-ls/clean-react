import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Login } from '@/presentation/pages'
import '@testing-library/jest-dom/extend-expect'

describe('Login page', () => {
  test('Should not render spinner and error on start', async () => {
    render(<Login />)
    expect(screen.queryByTestId('spinner')).toBeNull()
  })
})
