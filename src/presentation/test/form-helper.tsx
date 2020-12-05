import { fireEvent, RenderResult } from '@testing-library/react'
import faker from 'faker'

export const populateField = (sut: RenderResult, fieldName: string, fieldValue = faker.random.word()): void => {
  fireEvent.input(sut.getByTestId(fieldName), { target: { value: fieldValue } })
}
