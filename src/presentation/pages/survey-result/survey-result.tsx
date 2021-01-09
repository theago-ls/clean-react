import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import { onSurveyAnswerState, Result, surveyResultState } from '@/presentation/pages/survey-result/components'
import React, { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import Styles from './survey-result-styles.scss'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const [state, setState] = useRecoilState(surveyResultState)
  const setOnAnswer = useSetRecoilState(onSurveyAnswerState)

  const handleError = useErrorHandler((error: Error) => {
    setState({ isLoading: false, reload: false, surveyResult: null, error: error.message })
  })

  const handleReload = (): void => {
    setState(prevState => ({ ...prevState, reload: !prevState.reload }))
  }

  const handleAnswer = (answer: string): void => {
    if (!state.isLoading) {
      setState(prevState => ({ ...prevState, isLoading: true }))
      saveSurveyResult.save({ answer }).then(surveyResult => setState(prevState => ({ ...prevState, isLoading: false, surveyResult }))).catch(handleError)
    }
  }

  useEffect(() => {
    setOnAnswer({ onAnswer: handleAnswer })
  }, [])

  useEffect(() => {
    loadSurveyResult.load().then(surveyResult => setState(prevState => ({ ...prevState, surveyResult }))).catch(handleError)
  }, [state.reload])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult && <Result result={state.surveyResult} />}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={handleReload} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
