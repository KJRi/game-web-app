// @flow
import React from 'react'
import styles from './TagPost.css'
import PostPage from 'components/PostPage'
import { withRouter } from 'react-router'

type Props = {
  match: Object
}
type State = {
  postlist: Array<Object>
}
class TagPost extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      postlist: []
    }
  }
  componentWillMount () {
    const currenttag = this.props.match.params.tag
    fetch(`/post/get?tag=${currenttag}`, {
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
    return (
      <PostPage {...{ postlist }} />
    )
  }
}

// const ReactTemplate = (props: Props) => {
//   return (
//     <div>hello world</div>
//   )
// }

export default withRouter(TagPost)
