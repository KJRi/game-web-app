// @flow
import React from 'react'
import Logo from 'components/Logo'
import styles from './Header.css'

const Header = () => (
  <header className={styles['header']}>
    <Logo />
  </header>
)

export default Header
