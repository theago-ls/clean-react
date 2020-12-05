import React, { useState, useEffect } from 'react'

import { SaveAccessToken } from '@/domain/usecases/save-acess-token'
import { Authentication } from '@/domain/usecases'
import { Footer, LoginHeader, FormStatus, Input, SubmitButton } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation/validation'
import { Link, useHistory } from 'react-router-dom'
import Styles from './login-styles.scss'

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

const Login: React.FC<Props> = ({ validation, authentication, saveAccessToken }: Props) => {
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

  const history = useHistory()

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return
      }
      setState(prevState => ({ ...prevState, isLoading: true }))
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      await saveAccessToken.save(account.accessToken)
      history.replace('/')
    } catch (error) {
      setState(prevState => ({ ...prevState, isLoading: false, mainError: error.message }))
    }
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
        <Link data-testid="signup-link" replace to="/signup" className={Styles.link}>Criar conta</Link>
        <FormStatus state={state} />
      </form>
      <Footer />
    </div>
  )
}

export default Login
