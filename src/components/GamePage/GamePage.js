// @flow
import React from 'react'
import styles from './GamePage.css'
import { List, Avatar, Icon } from 'antd'

type Props = {
  postlist: Array<Object>,
}
type State = {
}

class GamePage extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
    }
  }
  render () {
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
)
    const postlist = this.props.postlist
    postlist && postlist.map(item => {
      item.href = `http://localhost:3000/game/${item._id}`
    })
    console.log(postlist)
    return (
      <List
        itemLayout='vertical'
        size='large'
        dataSource={postlist}
        renderItem={item => (
          <List.Item
            key={item.name}
            actions={[
              <IconText type='tag-o' text={item.tag} />]}
      >
            <List.Item.Meta
              avatar={<Avatar src={item.headImg} />}
              title={<a href={item.href}>{item.name}</a>}
        />
            {item.content}
          </List.Item>
    )}
  />
    )
  }
}

export default GamePage
