import React, { useContext, useEffect, useState } from 'react'
import { Footer, Header } from '@/presentation/components'
import Styles from './survey-list-styles.scss'
import {
  Error,
  List
} from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'
import { AccessDeniedError } from '@/domain/errors'
import { useHistory } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })

  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState((prevState) => ({ ...prevState, surveys })))
      .catch((err) => {
        if (err instanceof AccessDeniedError) {
          setCurrentAccount(undefined)
          history.replace('/login')
        } else {
          setState((prevState) => ({ ...prevState, error: err.message }))
        }
      })
  }, [state.reload])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        {state.error
          ? <Error error={state.error} setState={setState} />
          : <List state={state} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
