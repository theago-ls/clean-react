import React from 'react'
import Styles from './item-styles.scss'
import { Calendar, Icon, IconName } from '@/presentation/components'
import { LoadSurveyList } from '@/domain/usecases'

type Props = {
  survey: LoadSurveyList.Model
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWrap} iconName={survey.didAnswer ? IconName.thumbUp : IconName.thumbDown} />
        <Calendar date={survey.date} />
        <p data-testid="question">{survey.question}</p>
      </div>
      <span className={Styles.contentFooter}>Ver resultado</span>
    </li>
  )
}

export default SurveyItem
