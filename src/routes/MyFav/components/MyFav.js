// @flow
import React from 'react'
import './MyFav.css'
import GamePage from 'components/GamePage'
import { List, Avatar, Icon } from 'antd'

type Props = {}
type State = {
  likelist: Array<Object>,
  postlist: Array<Object>
}

class MyFav extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      likelist: [],
      postlist: []
    }
  }
  componentWillMount () {
    const username = localStorage.getItem('username')
    fetch(`/fav/getByUser?username=${username}`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
      res && res.map(res => {
        fetch(`/game/get?GameId=${res.gameId}`, {
          method: 'GET'
        })
        .then(res => res.json())
        .then(res => {
          let arr = [res]
          this.setState((prevState, props) => ({
            postlist: prevState.postlist.concat(arr)
          }))
        })
      })
    })
  }
  render () {
    const { postlist } = this.state
    return (
      <div>
        <GamePage {...{ postlist }} />
      </div>
    )
  }
}

export default MyFav
