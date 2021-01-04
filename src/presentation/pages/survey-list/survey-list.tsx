import React, { useEffect, useState } from 'react'
import { Footer, Header } from '@/presentation/components'
import Styles from './survey-list-styles.scss'
import {
  Error,
  List
} from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: ''
  })

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState((prevState) => ({ ...prevState, surveys })))
      .catch((err) =>
        setState((prevState) => ({ ...prevState, error: err.message }))
      )
  }, [])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        {state.error
          ? <Error error={state.error}/>
          : <List state={state}/>}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
