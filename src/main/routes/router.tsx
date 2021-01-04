import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'

import { makeLogin, makeSignup, makeSurveyList } from '@/main/factories/pages'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters/current-account-adapter'
import { PrivateRoute } from '@/presentation/components'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountAdapter,
      getCurrentAccount: getCurrentAccountAdapter
    }}>
      <BrowserRouter>
        <Switch>
          <Route path='/login' exact component={makeLogin}/>
          <Route path='/signup' exact component={makeSignup}/>
          <PrivateRoute path='/' exact component={makeSurveyList}/>
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
