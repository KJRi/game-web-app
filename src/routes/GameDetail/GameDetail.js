// @flow
import React from 'react'
import styles from './GameDetail.css'
import { Input, Icon, Layout, Menu } from 'antd'
import GamePage from 'components/GamePage'
const Search = Input.Search
const { Sider } = Layout

type Props = {}
type State = {
  postlist: Array<Object>
}

class GameDetail extends React.PureComponent<Props, State> {
  searchPst: Function
  constructor (props: Props) {
    super(props)
    this.state = {
      postlist: []
    }
    this.searchPst = this.searchPst.bind(this)
  }
  searchPst (value) {
    const evalue = value.trim()
    fetch(`/game/get?name=${evalue}`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        postlist: res
      })
    })
  }
  handleClick = (e: Object) => {
    const tag = e.key
    fetch(`/game/get?tag=${tag}`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        postlist: res
      })
    })
  }
  componentDidMount () {
    fetch('/game/get', {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        postlist: res
      })
    })
  }
  render () {
    const { postlist } = this.state
    console.log(postlist)
    return (
      <Layout>
        <Sider width={100} style={{ background: '#fff' }}>
          <Menu
            mode='inline'
            onClick={this.handleClick}
            style={{ height: '100%', borderRight: 0 }}
        >
            <Menu.Item key='冒险'>冒险</Menu.Item>
            <Menu.Item key='街机'>街机</Menu.Item>
            <Menu.Item key='休闲'>休闲</Menu.Item>
            <Menu.Item key='音乐'>音乐</Menu.Item>
            <Menu.Item key='益智'>益智</Menu.Item>
            <Menu.Item key='竞速'>竞速</Menu.Item>
            <Menu.Item key='策咯'>策咯</Menu.Item>
            <Menu.Item key='动作'>动作</Menu.Item>
            <Menu.Item key='模拟'>模拟</Menu.Item>
          </Menu>
        </Sider>
        <div style={{ width: '100%' }}>
          <Search
            placeholder='请输入您想搜索的礼物'
            onSearch={this.searchPst}
            size='large'
        />
          <GamePage {...{ postlist }} />
        </div>
      </Layout>
    )
  }
}

export default GameDetail
