import React, { useEffect, useState } from 'react'
import { Calendar, Error, Footer, Header, Loading } from '@/presentation/components'
import FlipMove from 'react-flip-move'
import Styles from './survey-result-styles.scss'
import { LoadSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import { useHistory } from 'react-router-dom'

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

  const { goBack } = useHistory()

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
        {state.surveyResult && <>
          <hgroup>
            <Calendar date={state.surveyResult.date} className={Styles.calendarWrap} />
            <h2 data-testid="question">{state.surveyResult.question}</h2>
          </hgroup>
          <FlipMove data-testid="answers" className={Styles.answersList}>
            {state.surveyResult?.answers && state.surveyResult?.answers.map((answer) =>
              <li data-testid="answer-wrap" className={answer.isCurrentAccountAnswer ? Styles.active : ''} key={answer.answer}>
                {answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
                <span data-testid="answer" className={Styles.answer}>{answer.answer}</span>
                <span data-testid="percent" className={Styles.percent}>{`${(answer.percent).toFixed(2)}%`}</span>
              </li>)}
          </FlipMove>
          <button data-testid='back-button' onClick={goBack}>Voltar</button>
        </>}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={handleReload} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
