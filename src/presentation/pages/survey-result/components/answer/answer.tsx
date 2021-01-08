import React from 'react'
import { SurveyResultAnswerModel } from '@/domain/models'
import Styles from './answer-styles.scss'

type Props = { answer: SurveyResultAnswerModel }

const Answer: React.FC<Props> = ({ answer }: Props) => {
  return (
    <li data-testid="answer-wrap" className={[Styles.answerWrap, answer.isCurrentAccountAnswer ? Styles.active : ''].join(' ')}>
      {answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
      <span data-testid="answer" className={Styles.answer}>{answer.answer}</span>
      <span data-testid="percent" className={Styles.percent}>{`${(answer.percent).toFixed(2)}%`}</span>
    </li>
  )
}

export default Answer
