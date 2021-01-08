import React from 'react'
import { makeRemoteLoadSurveyResult } from '@/main/factories/usecases'
import { SurveyResult } from '@/presentation/pages'
import { useParams } from 'react-router-dom'

export const makeSurveyResult: React.FC = () => {
  const { id } = useParams()

  return <SurveyResult
    loadSurveyResult={makeRemoteLoadSurveyResult(id)}
  />
}
