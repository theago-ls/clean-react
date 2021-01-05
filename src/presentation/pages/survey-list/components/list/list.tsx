import React from 'react'
import { SurveyItemEmpty, SurveyItem } from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'

type Props = {
  state: { error: string, surveys: LoadSurveyList.Model[]}
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
