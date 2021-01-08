import React from 'react'
import { Footer, Header, Spinner } from '@/presentation/components'
import FlipMove from 'react-flip-move'
import Styles from './survey-result-styles.scss'

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Pergunta</h2>
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
        <div className={Styles.loadingWrap}>
          <div className={Styles.loading}>
            <span>Aguarde...</span>
            <Spinner isNegative />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
