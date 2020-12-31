import { fireEvent, screen } from '@testing-library/react'
import faker from 'faker'

export const populateField = (fieldName: string, fieldValue = faker.random.word()): void => {
  fireEvent.input(screen.getByTestId(fieldName), { target: { value: fieldValue } })
}
