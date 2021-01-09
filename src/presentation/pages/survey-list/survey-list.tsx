import { LoadSurveyList } from '@/domain/usecases'
import { Error, Footer, Header } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import {
  List, surveyListState
} from '@/presentation/pages/survey-list/components'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import Styles from './survey-list-styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useRecoilState(surveyListState)

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
