import { LoadSurveyResult } from '@/domain/usecases'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import React, { useEffect, useState } from 'react'
import { Result } from '@/presentation/pages/survey-result/components'
import Styles from './survey-result-styles.scss'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })

  const handleError = useErrorHandler((error: Error) => {
    setState({ isLoading: false, reload: false, surveyResult: null, error: error.message })
  })

  const handleReload = (): void => {
    setState(prevState => ({ ...prevState, reload: !prevState.reload }))
  }

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
