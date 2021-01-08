import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import faker from 'faker'

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  answer: faker.random.words(5)
})

export const mockSurveyResultModel = (): LoadSurveyResult.Model => ({
  question: faker.random.words(10),
  date: faker.date.recent(),
  answers: [{
    image: faker.internet.url(),
    answer: faker.random.word(),
    count: faker.random.number(),
    percent: faker.random.number(100),
    isCurrentAccountAnswer: true
  },
  {
    answer: faker.random.word(),
    count: faker.random.number(),
    percent: faker.random.number(100),
    isCurrentAccountAnswer: false
  }]
})

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0
  surveyResult = mockSurveyResultModel()

  async load (): Promise<LoadSurveyResult.Model> {
    this.callsCount++
    return this.surveyResult
  }
}

export class SaveSurveyResultSpy implements SaveSurveyResult {
  surveyResult = mockSurveyResultModel()
  params: SaveSurveyResult.Params
  callsCount = 0

  async save (params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    this.callsCount++
    this.params = params
    return this.surveyResult
  }
}
