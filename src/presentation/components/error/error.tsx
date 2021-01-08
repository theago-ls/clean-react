import React from 'react'
import Styles from './error-styles.scss'

type Props = {
  error: string
  reload: () => void
}

const Error: React.FC<Props> = ({ error, reload }: Props) => {
  return (
    <div data-testid="error" className={Styles.errorWrap}>
      <span>{error}</span>
      <button data-testid="reload" onClick={reload}>Tentar novamente</button>
    </div>
  )
}

export default Error
