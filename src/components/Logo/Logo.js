// @flow
import React from 'react'
import styles from './Logo.css'

type Props = {
  location: Location
}
type State = {
  current: string
}
class Logo extends React.Component<Props, State> {
  props: Props
  activeMenuItem: Function

  constructor (props: Props) {
    super(props)

    this.state = { current: '-1' }

    this.activeMenuItem = this.activeMenuItem.bind(this)
  }
  componentWillMount () {
    this.activeMenuItem(location)
  }

  componentWillReceiveProps (nextProps: Props) {
    this.activeMenuItem(location)
  }

  activeMenuItem (location: Location) {
    const { pathname } = location
    let key
    switch (pathname) {
      case '/':
        key = '游戏推荐网'
        break
      case '/detail':
        key = '详情页'
        break
      case '/circle':
        key = '朋友圈'
        break
      case '/personal':
        key = '个人中心'
        break
      case '/gameDetail':
        key = '游戏分类'
        break
      default:
        key = '游戏推荐网'
    }
    this.setState({ current: key })
  }

  render () {
    return (
      <div className={styles['logo']}>
        {this.state.current}
      </div>
    )
  }
}

export default Logo
