import React, { useState, useEffect } from 'react'

import Styles from './login-styles.scss'
import { Footer, LoginHeader, FormStatus, Input, SubmitButton } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation/validation'

type Props = {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    errorMessage: '',
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    mainError: ''
  })

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setState(prevState => ({ ...prevState, isLoading: true }))
  }

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    }))
  }, [state.email, state.password])

  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" state={state} setState={setState} onChange={handleChange}/>
        <Input type="password" name="password" placeholder="Digite sua senha" state={state} setState={setState} />
        <SubmitButton state={state} text="Entrar"/>
        <FormStatus state={state} />
      </form>
      <Footer />
    </div>
  )
}

export default Login
