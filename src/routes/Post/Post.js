// @flow
import React from 'react'
import styles from './Post.css'
import { Card, Icon, Avatar, Modal, Input, message, Button } from 'antd'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
const { TextArea } = Input
const { Meta } = Card

type Props = {
  match: Object
}
type State = {
  postlist: Object,
  visible: Boolean,
  confirmLoading: Boolean,
  comment: String,
  commentList: Array<Object>,
  userinfo: Object,
  likeState: Boolean,
}

class Post extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      postlist: {},
      visible: false,
      confirmLoading: false,
      comment: '',
      commentList: [],
      userinfo: {},
      likeState: false,
      followState: false
    }
  }
  componentWillMount () {
    const id = this.props.match.params.id
    const username = localStorage.getItem('username')
    fetch(`/post/get?postId=${id}`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        postlist: res
      })
    })
    fetch(`/info/get?username=${username}`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        userinfo: res
      })
    })
    fetch(`/like/getBy?postId=${id}&&username=${username}`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
      if (res.length === 1) {
        this.setState({
          likeState: true
        })
      }
    })
    fetch(`/comment/get?postId=${id}`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        commentList: res
      })
    })
  }
  handleOk = () => {
    this.setState({
      confirmLoading: true
    })
    const value = this.state.comment
    fetch('/comment/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: localStorage.getItem('username'),
        content: value,
        postId: this.props.match.params.id
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
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      })
    }, 2000)
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  likeIt = () => {
    const { likeState } = this.state
    if (likeState) {
      // 取消点赞
      fetch('/like/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: localStorage.getItem('username'),
          postId: this.props.match.params.id
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
        likeState: false
      })
    } else {
      fetch('/like/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: localStorage.getItem('username'),
          postId: this.props.match.params.id
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
        likeState: true
      })
    }
  }
  render () {
    const user = `/circle/${this.state.postlist.author}`
    const { postlist, visible, confirmLoading, likeState, commentList, userinfo } = this.state
    return (
      <div>
        <Card
          actions={[<Icon type={
            likeState
            ? 'like'
            : 'like-o'
          } text={postlist.adNum} style={{ color: 'red' }} onClick={this.likeIt} />,
            <Icon type='edit' text={postlist.comNum} onClick={() => this.setState({ visible: true })} />]}
  >
          <Meta
            avatar={
              <Link to={user}>
                <div style={{ textAlign: 'center' }}>
                  {
                  userinfo.headerImg
                  ? <Avatar src={userinfo.headerImg} />
                  : <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                }
                  <h5 style={{ color: '#999' }}>{postlist.author}</h5>
                </div>
              </Link>
          }
            title={postlist.title}
            description={postlist.postTime}
            style={{ marginBottom: 10 }}
    />
          {postlist.content}
        </Card>
        {
          commentList && commentList.map((list, index) => {
            return <Card bordered={false}
              style={{ marginTop: 10 }}
              >
              <Meta
                avatar={
                  <div style={{ textAlign: 'center' }}>
                    <h5 style={{ color: '#999' }}>{postlist.author}</h5>
                  </div>
              }
                title={list.content}
                description={list.commentTime}
        />
            </Card>
          })
        }
        <Modal title='回复'
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <TextArea prefix={<Icon type='edit' style={{ fontSize: 13 }} />}
            style={{ height: 300 }} placeholder='你的回复'
            onChange={(e) => this.setState({ comment: e.target.value })} />
        </Modal>
      </div>
    )
  }
}

export default withRouter(Post)
