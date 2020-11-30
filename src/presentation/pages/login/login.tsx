import React, { useState } from 'react'

import Styles from './login-styles.scss'
import { Footer, LoginHeader, FormStatus, Input, SubmitButton } from '@/presentation/components'

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    errorMessage: '',
    isFormInvalid: true,
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório'
  })

  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <form data-testid="form" className={Styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" state={state} setState={() => {}} />
        <Input type="password" name="password" placeholder="Digite sua senha" state={state} setState={() => {}} />
        <SubmitButton state={state} text="Entrar"/>
        <FormStatus state={state} />
      </form>
      <Footer />
    </div>
  )
}

export default Login
