import React from 'react'
import { makeRemoteLoadSurveyResult, makeRemoteSaveSurveyResult } from '@/main/factories/usecases'
import { SurveyResult } from '@/presentation/pages'
import { useParams } from 'react-router-dom'

type SurveyResultRoute = {
  id: string
}

export const makeSurveyResult: React.FC = () => {
  const { id } = useParams<SurveyResultRoute>()

  return <SurveyResult
    loadSurveyResult={makeRemoteLoadSurveyResult(id)}
    saveSurveyResult={makeRemoteSaveSurveyResult(id)}
  />
}
