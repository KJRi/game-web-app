// @flow
import React from 'react'
import './Personal.css'
import { message } from 'antd'
import PersonalList from 'components/PersonalList'

class Personal extends React.PureComponent<Props, State> {
  componentWillMount () {
    const usernname = localStorage.getItem('username')
    if (!usernname) {
      message.info('请先登录')
      window.location.href = '/login'
    }
  }
  render () {
    return (
      <div>
        <PersonalList />
      </div>
    )
  }
}

export default Personal
