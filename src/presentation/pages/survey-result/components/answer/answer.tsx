import React from 'react'
import { SurveyResultAnswerModel } from '@/domain/models'
import Styles from './answer-styles.scss'
import { useRecoilValue } from 'recoil'
import { onSurveyAnswerState } from '../atoms/atoms'

type Props = {
  answer: SurveyResultAnswerModel
}

const Answer: React.FC<Props> = ({ answer }: Props) => {
  const { onAnswer } = useRecoilValue(onSurveyAnswerState)

  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault()
    if (e.currentTarget.classList.contains(Styles.active)) {
      return
    }
    onAnswer(answer.answer)
  }

  return (
    <li
      data-testid="answer-wrap"
      className={[
        Styles.answerWrap,
        answer.isCurrentAccountAnswer ? Styles.active : ''
      ].join(' ')}
      onClick={handleClick}
    >
      {answer.image && (
        <img data-testid="image" src={answer.image} alt={answer.answer} />
      )}
      <span data-testid="answer" className={Styles.answer}>
        {answer.answer}
      </span>
      <span
        data-testid="percent"
        className={Styles.percent}
      >{`${answer.percent.toFixed(2)}%`}</span>
    </li>
  )
}

export default Answer
