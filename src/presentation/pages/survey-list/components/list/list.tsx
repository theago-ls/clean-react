import React from 'react'
import { SurveyItemEmpty, SurveyItem } from '@/presentation/pages/survey-list/components'
import { SurveyModel } from '@/domain/models'

type Props = {
  state: { error: string, surveys: SurveyModel[]}
}

const List: React.FC<Props> = ({ state }: Props) => {
  return (
    <>
      <ul data-testid="survey-list">
        {state.surveys.length > 0 ? (
          state.surveys.map((survey) => (
            <SurveyItem key={survey.id} survey={survey} />
          ))
        ) : (
          <SurveyItemEmpty />
        )}
      </ul>
    </>
  )
}

export default List
