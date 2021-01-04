import React from 'react'
import Styles from './error-styles.scss'

type Props = {
  error: string
}

const Error: React.FC<Props> = ({ error }: Props) => {
  return (
    <div data-testid="error" className={Styles.errorWrap}>
      <span>{error}</span>
      <button>Recarregar</button>
    </div>
  )
}

export default Error
