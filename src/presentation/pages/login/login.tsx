import React from 'react'

import Styles from './login-styles.scss'
import { Footer, LoginHeader, FormStatus, Input, SubmitButton } from '@/presentation/components'

const Login: React.FC = () => {
  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <form data-testid="form" className={Styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" state={{}} setState={() => {}} />
        <Input type="password" name="password" placeholder="Digite sua senha" state={{}} setState={() => {}} />
        <SubmitButton state={{}} text="Entrar"/>
        <FormStatus state={{}} />
      </form>
      <Footer />
    </div>
  )
}

export default Login
