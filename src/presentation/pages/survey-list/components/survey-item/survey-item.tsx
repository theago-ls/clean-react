import React from 'react'
import Styles from './survey-item-styles.scss'
import { Icon, IconName } from '@/presentation/components'

const SurveyItem: React.FC = () => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWrap} iconName={IconName.thumbUp} />
        <time>
          <span className={Styles.day}>22</span>
          <span className={Styles.month}>03</span>
          <span className={Styles.year}>2020</span>
        </time>
        <p>Qual é o seu framework web favorito?</p>
      </div>
      <span className={Styles.contentFooter}>Ver resultado</span>
    </li>
  )
}

export default SurveyItem
