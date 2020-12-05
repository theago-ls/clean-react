import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Footer, FormStatus, Input, LoginHeader, SubmitButton } from '@/presentation/components'
import Styles from './signup-styles.scss'

const Signup: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: 'Campo obrigatório',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: ''
  })

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <form className={Styles.form} onSubmit={() => {}}>
        <h2>Criar conta</h2>
        <Input data-testid="name" type="text" name="name" placeholder="Digite seu nome" state={state} setState={() => {}} onChange={() => {}}/>
        <Input data-testid="email" type="email" name="email" placeholder="Digite seu e-mail" state={state} setState={() => {}} onChange={() => {}}/>
        <Input data-testid="password" type="password" name="password" placeholder="Digite sua senha" state={state} setState={() => {}} />
        <Input data-testid="passwordConfirmation" type="password" name="passwordConfirmation" placeholder="Confirme a sua senha" state={state} setState={() => {}} />
        <SubmitButton data-testid="submit" state={state} text="Entrar"/>
        <span className={Styles.link}>Logar em uma conta existente</span>
        <FormStatus state={state} />
      </form>
      <Footer />
    </div>
  )
}

export default Signup
