import React, { memo, useContext } from 'react'
import { Logo } from '@/presentation/components'
import Styles from './header-styles.scss'
import { ApiContext } from '@/presentation/contexts'
import { useLogout } from '@/presentation/hooks'

const Header: React.FC = () => {
  const { getCurrentAccount } = useContext(ApiContext)

  const logout = useLogout()

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    e.preventDefault()
    logout()
  }

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" href="#" onClick={handleLogout}>Sair</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
