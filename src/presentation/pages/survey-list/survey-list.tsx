import React, { useEffect, useState } from 'react'
import { Error, Footer, Header } from '@/presentation/components'
import Styles from './survey-list-styles.scss'
import {
  List
} from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })

  const handleError = useErrorHandler((error: Error) => {
    setState(prevState => ({ ...prevState, error: error.message }))
  })

  const handleReload = (): void => {
    setState(prevState => ({ surveys: [], error: '', reload: !prevState.reload }))
  }

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState((prevState) => ({ ...prevState, surveys })))
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        {state.error
          ? <Error error={state.error} reload={handleReload} />
          : <List state={state} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
