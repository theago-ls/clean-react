import React, { useState, useEffect, useContext } from 'react'

import { ApiContext } from '@/presentation/contexts'
import { Authentication } from '@/domain/usecases'
import { Footer, LoginHeader, FormStatus, Input, SubmitButton } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation/validation'
import { Link, useHistory } from 'react-router-dom'
import Styles from './login-styles.scss'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)

  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    errorMessage: '',
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
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState(prevState => ({ ...prevState, isLoading: true }))
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      setCurrentAccount(account)
      history.replace('/')
    } catch (error) {
      setState(prevState => ({ ...prevState, isLoading: false, mainError: error.message }))
    }
  }

  useEffect(() => {
    const { email, password } = state
    const formData = { email, password }
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)

    setState(prevState => ({
      ...prevState,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError
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
