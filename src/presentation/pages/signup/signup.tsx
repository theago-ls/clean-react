import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Footer, FormStatus, Input, LoginHeader, SubmitButton } from '@/presentation/components'
import Styles from './signup-styles.scss'
import { Validation } from '@/presentation/protocols'

type Props = {
  validation: Validation
}

const Signup: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: ''
  })

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      nameError: validation.validate('email', state.name),
      emailError: validation.validate('email', state.email)
    }))
  }, [state.name, state.email])

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <form className={Styles.form} onSubmit={() => {}}>
        <h2>Criar conta</h2>
        <Input data-testid="name" type="text" name="name" placeholder="Digite seu nome" state={state} setState={setState} onChange={() => {}}/>
        <Input data-testid="email" type="email" name="email" placeholder="Digite seu e-mail" state={state} setState={setState} onChange={() => {}}/>
        <Input data-testid="password" type="password" name="password" placeholder="Digite sua senha" state={state} setState={setState} />
        <Input data-testid="passwordConfirmation" type="password" name="passwordConfirmation" placeholder="Confirme a sua senha" state={state} setState={setState} />
        <SubmitButton data-testid="submit" state={state} text="Entrar"/>
        <span className={Styles.link}>Logar em uma conta existente</span>
        <FormStatus state={state} />
      </form>
      <Footer />
    </div>
  )
}

export default Signup