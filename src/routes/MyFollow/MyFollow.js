// @flow
import React from 'react'
import styles from './MyFollow.css'
import { Link } from 'react-router-dom'
import { List } from 'antd'

type Props = {}
type State = {
  followList: Array<Object>
}

class MyFollow extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      followList: []
    }
  }
  componentWillMount () {
    const username = localStorage.getItem('username')
    fetch(`/follow/getByUser?username=${username}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(res => {
      console.log(res)
      this.setState({
        followList: res
      })
    })
  }
  render () {
    const { followList } = this.state
    return (
      <List
        header={<div>你的关注:</div>}
        footer={<div>共{followList.length}个关注</div>}
        bordered
        dataSource={followList}
        renderItem={item => (<List.Item
          onClick={() => { window.location.href = `/circle/${item.follow}` }}>
          {item.follow}
        </List.Item>)}
  />
    )
  }
}

// const ReactTemplate = (props: Props) => {
//   return (
//     <div>hello world</div>
//   )
// }

export default MyFollow
