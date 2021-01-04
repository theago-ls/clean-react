import React from 'react'
import Styles from './error-styles.scss'

type Props = {
  error: string
  setState: CallableFunction
}

const Error: React.FC<Props> = ({ error, setState }: Props) => {
  const reload = (): void => {
    setState(prevState => ({ surveys: [], error: '', reload: !prevState.reload }))
  }

  return (
    <div data-testid="error" className={Styles.errorWrap}>
      <span>{error}</span>
      <button data-testid="reload" onClick={reload}>Tentar novamente</button>
    </div>
  )
}

export default Error
