import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { SurveyList } from '@/presentation/pages'

type Factory = {
  makeLogin: React.FC
  makeSignup: React.FC
}

const Router: React.FC<Factory> = (factory: Factory) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact component={factory.makeLogin}/>
        <Route path='/signup' exact component={factory.makeSignup}/>
        <Route path='/' exact component={SurveyList}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
