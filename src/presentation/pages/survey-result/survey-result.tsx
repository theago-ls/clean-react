import React, { useState } from 'react'
import { Calendar, Error, Footer, Header, Loading } from '@/presentation/components'
import FlipMove from 'react-flip-move'
import Styles from './survey-result-styles.scss'
import { LoadSurveyResult } from '@/domain/usecases'

const SurveyResult: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model
  })

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {false && <>
          <hgroup>
            <Calendar date={new Date()} className={Styles.calendarWrap} />
            <h2>Pergunta</h2>
          </hgroup>
          <FlipMove className={Styles.answersList}>
            <li>
              <img src="" />
              <span className={Styles.answer}>ReactJS</span>
              <span className={Styles.percent}>0%</span>
            </li>
            <li className={Styles.active}>
              <img src="" />
              <span className={Styles.answer}>ReactJS</span>
              <span className={Styles.percent}>0%</span>
            </li>
            <li>
              <img src="" />
              <span className={Styles.answer}>ReactJS</span>
              <span className={Styles.percent}>0%</span>
            </li>
          </FlipMove>
          <button>Voltar</button>
          {state.isLoading && <Loading />}
          {state.error && <Error error={state.error} reload={() => { }} />}
        </>}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
