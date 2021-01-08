import React from 'react'
import FlipMove from 'react-flip-move'
import { useHistory } from 'react-router-dom'
import { LoadSurveyResult } from '@/domain/usecases'
import { Calendar } from '@/presentation/components'
import { Answer } from '@/presentation/pages/survey-result/components'
import Styles from './result-styles.scss'

type Props = {
  result: LoadSurveyResult.Model
  onAnswer: (answer: string) => void
}

const Result: React.FC<Props> = ({ result, onAnswer }: Props) => {
  const { goBack } = useHistory()

  return (
    <div className={Styles.resultWrap}>

      <hgroup>
        <Calendar date={result.date} className={Styles.calendarWrap} />
        <h2 data-testid="question">{result.question}</h2>
      </hgroup>
      <FlipMove data-testid="answers" className={Styles.answersList}>
        <>
          {result.answers?.map((answer) => <Answer key={answer.answer} answer={answer} onAnswer={onAnswer} />)}
        </>
      </FlipMove>
      <button className={Styles.button} data-testid='back-button' onClick={goBack}>Voltar</button>

    </div >
  )
}

export default Result
