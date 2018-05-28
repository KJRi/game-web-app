// @flow
import React from 'react'
import styles from './GameDetail.css'
import { Input, Icon, Layout, Menu } from 'antd'
import GoodsList from 'components/GoodsList'
const Search = Input.Search
const { Sider } = Layout

type Props = {}
type State = {
  goodsList: Array<Object>,
  priceState: Boolean,
}

class GameDetail extends React.PureComponent<Props, State> {
  searchPst: Function
  constructor (props: Props) {
    super(props)
    this.state = {
      goodsList: [],
      priceState: true
    }
    this.searchPst = this.searchPst.bind(this)
  }
  searchPst (value) {
    const evalue = value.trim()
    const { priceState } = this.state
    if (priceState) {
      fetch(`/good/get?title=${evalue}`, {
        method: 'GET'
      })
    .then(res => res.json())
    .then(res => {
      this.setState({
        goodsList: res
      })
    })
    } else {
      fetch(`/good/getdown?title=${evalue}`, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(res => {
        this.setState({
          goodsList: res
        })
      })
    }
  }
  handleClick = (e: Object) => {
    const tag = e.key
    const { priceState } = this.state
    if (priceState) {
      fetch(`/good/get?tag=${tag}`, {
        method: 'GET'
      })
    .then(res => res.json())
    .then(res => {
      this.setState({
        goodsList: res
      })
    })
    } else {
      fetch(`/good/getdown?tag=${tag}`, {
        method: 'GET'
      })
  .then(res => res.json())
  .then(res => {
    this.setState({
      goodsList: res
    })
  })
    }
  }
  componentDidMount () {
    const { priceState } = this.state
    if (priceState) {
      fetch('/good/get', {
        method: 'GET'
      })
    .then(res => res.json())
    .then(res => {
      this.setState({
        goodsList: res
      })
    })
    } else {
      fetch('/good/get', {
        method: 'GET'
      })
  .then(res => res.json())
  .then(res => {
    this.setState({
      goodsList: res
    })
  })
    }
  }
  changeSort = () => {
    const { priceState } = this.state
    if (priceState) {
      this.setState({
        priceState: false
      })
    } else {
      this.setState({
        priceState: true
      })
    }
  }
  render () {
    const { goodsList, priceState } = this.state
    return (
      <Layout>
        <Sider width={100} style={{ background: '#fff' }}>
          <Menu
            mode='inline'
            onClick={this.handleClick}
            style={{ height: '100%', borderRight: 0 }}
        >
            <Menu.Item key='手机壳'>手机壳</Menu.Item>
            <Menu.Item key='数据线'>数据线</Menu.Item>
            <Menu.Item key='充电宝'>充电宝</Menu.Item>
            <Menu.Item key='钢化膜'>钢化膜</Menu.Item>
            <Menu.Item key='耳机'>耳机</Menu.Item>
            <Menu.Item key='其他'>其他</Menu.Item>
          </Menu>
        </Sider>
        <div style={{ width: '100%' }}>
          <Search
            placeholder='请输入您想搜索的礼物'
            onSearch={this.searchPst}
            size='large'
        />
          <div className={styles['containal']}>
        价格排序<Icon type={
          priceState
          ? 'caret-up'
          : 'up'
        } onClick={this.changeSort} />
      |<Icon type={
        priceState
        ? 'down'
        : 'caret-down'
      } onClick={this.changeSort} />
          </div>
          <GoodsList {...{ goodsList }} />
        </div>
      </Layout>
    )
  }
}

export default GameDetail
