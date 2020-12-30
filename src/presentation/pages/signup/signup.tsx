import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Footer, FormStatus, Input, LoginHeader, SubmitButton } from '@/presentation/components'
import Styles from './signup-styles.scss'
import { Validation } from '@/presentation/protocols'
import { AddAccount, UpdateCurrentAccount } from '@/domain/usecases'

type Props = {
  validation: Validation
  addAccount: AddAccount
  updateCurrentAccount: UpdateCurrentAccount
}

const Signup: React.FC<Props> = ({ validation, addAccount, updateCurrentAccount }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  const history = useHistory()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState(prevState => ({ ...prevState, isLoading: true }))
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      await updateCurrentAccount.save(account)
      history.replace('/')
    } catch (error) {
      setState(prevState => ({ ...prevState, isLoading: false, mainError: error.message }))
    }
  }

  useEffect(() => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }
    const nameError = validation.validate('name', formData)
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    const passwordConfirmationError = validation.validate('passwordConfirmation', formData)

    setState(prevState => ({
      ...prevState,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid: !!nameError || !!emailError || !!passwordError || !!passwordConfirmationError
    }))
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  return (
    <div className={Styles.signupWrap}>
      <LoginHeader />
      <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
        <h2>Criar conta</h2>
        <Input data-testid="name" type="text" name="name" placeholder="Digite seu nome" state={state} setState={setState} onChange={() => {}}/>
        <Input data-testid="email" type="email" name="email" placeholder="Digite seu e-mail" state={state} setState={setState} onChange={() => {}}/>
        <Input data-testid="password" type="password" name="password" placeholder="Digite sua senha" state={state} setState={setState} />
        <Input data-testid="passwordConfirmation" type="password" name="passwordConfirmation" placeholder="Confirme a sua senha" state={state} setState={setState} />
        <SubmitButton data-testid="submit" state={state} text="Cadastrar"/>
        <Link data-testid="login-link" replace to='/login' className={Styles.link}>Logar em uma conta existente</Link>
        <FormStatus state={state} />
      </form>
      <Footer />
    </div>
  )
}

export default Signup
