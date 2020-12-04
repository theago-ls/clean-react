import React from 'react'
import { Link } from 'react-router-dom'
import { Footer, FormStatus, Input, LoginHeader, SubmitButton } from '@/presentation/components'
import Styles from './signup-styles.scss'

const Signup: React.FC = () => {
  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <form className={Styles.form} onSubmit={() => {}}>
        <h2>Criar conta</h2>
        <Input type="email" name="email" placeholder="Digite seu nome" state={{}} setState={() => {}} onChange={() => {}}/>
        <Input type="email" name="email" placeholder="Digite seu e-mail" state={{}} setState={() => {}} onChange={() => {}}/>
        <Input type="password" name="password" placeholder="Digite sua senha" state={{}} setState={() => {}} />
        <Input type="password" name="password" placeholder="Confirme a sua senha" state={{}} setState={() => {}} />
        <SubmitButton state={{}} text="Entrar"/>
        <Link to="/login" className={Styles.link}>Logar em uma conta existente</Link>
        <FormStatus state={{}} />
      </form>
      <Footer />
    </div>
  )
}

export default Signup
