// @flow
import React from 'react'
import styles from './Game.css'
import { Card, Icon, Avatar, Carousel, Modal, Input, message, Button } from 'antd'
import { withRouter } from 'react-router'
const { Meta } = Card

type Props = {
  match: Object
}
type State = {
  gameDetail: Object,
  imageUrl: Array,
  favState: Boolean
}

class Game extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      gameDetail: {},
      imageUrl: [],
      favState: false
    }
  }
  componentDidMount () {
    const id = this.props.match.params.id
    const username = localStorage.getItem('username')
    fetch(`/game/get?GameId=${id}`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => this.setState({
      gameDetail: res,
      imageUrl: res.imageUrl
    }))
    fetch(`/fav/getBy?gameId=${id}&&username=${username}`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      if (res.length === 1) {
        this.setState({
          favState: true
        })
      }
    })
  }
  likeIt = () => {
    const { favState } = this.state
    if (favState) {
      // 取消点赞
      fetch('/fav/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: localStorage.getItem('username'),
          gameId: this.props.match.params.id
        })
      }).then(res => res.json())
        .then(res => {
          // 后端正确
          if (res.success) {
            message.destroy()
            message.success(res.message)
          } else {
            message.destroy()
            message.info(res.message)
          }
        })
        .catch(e => console.log('Oops, error', e))
      this.setState({
        favState: false
      })
    } else {
      fetch('/fav/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: localStorage.getItem('username'),
          gameId: this.props.match.params.id
        })
      }).then(res => res.json())
        .then(res => {
          // 后端正确
          if (res.success) {
            message.destroy()
            message.success(res.message)
          } else {
            message.destroy()
            message.info(res.message)
          }
        })
        .catch(e => console.log('Oops, error', e))
      this.setState({
        favState: true
      })
    }
  }

  render () {
    const { gameDetail, imageUrl, favState } = this.state
    return (
      <Card
        cover={<Carousel autoplay>
          <div><img src={imageUrl[0]} /></div>
          <div><img src={imageUrl[1]} /></div>
          <div><img src={imageUrl[2]} /></div>
          <div><img src={imageUrl[3]} /></div>
        </Carousel>}
        actions={[<Icon type={
          favState
          ? 'star'
          : 'star-o'
        } style={{ color: 'red' }} onClick={this.likeIt} />]}
  >
        <Meta
          avatar={<Avatar size='large' shape='square' src={gameDetail.headImg} />}
          title={gameDetail.name}
          description={gameDetail.content}
    />
      </Card>
    )
  }
}

export default withRouter(Game)
