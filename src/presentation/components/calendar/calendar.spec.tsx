import React from 'react'
import { render, screen } from '@testing-library/react'
import Calendar from './calendar'

const makeSut = (date: Date): void => {
  render(<Calendar date={date} />)
}

describe('Calendar Component', () => {
  test('should render with correct values', () => {
    makeSut(new Date('2020-01-10T00:00:00'))
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('01')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
  })

  test('should render with correct values', () => {
    makeSut(new Date('2019-02-03T00:00:00'))
    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent('02')
    expect(screen.getByTestId('year')).toHaveTextContent('2019')
  })
})
