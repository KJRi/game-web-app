// @flow
import React from 'react'
import styles from './Home.css'
import { Card } from 'antd'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
const { Meta } = Card

type Props = {
  match: Object
}
type State = {
}

class Home extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount () {
    fetch(`/game/get`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => console.log(res))
  }

  render () {
    return (
      <div>
        <Link to='/game/5b0b7c76c4fc6b790c21fb0a'>
          <Card
            hoverable
            cover={<img src='https://img.tapimg.com/market/images/c9a4858f66d1c450f9245e2a70a57d66.jpg?imageMogr2/auto-orient/thumbnail/2080x/strip/gravity/Center/crop/2080x828/format/jpg/quality/80/interlace/1' />}
  >
            <Meta
              title='疯狂兔子：无敌跑跑'
              description='和疯兔一起开启冒险跑酷之旅！'
    />
          </Card>
        </Link>
        <Link to='/game/5b0b801fc4fc6b790c21fb0f'>
          <Card
            hoverable
            cover={<img src='https://img.tapimg.com/market/images/ee907c5487e95b0caf0d5ecd6740c775.jpg?imageMogr2/auto-orient/thumbnail/2080x/strip/gravity/Center/crop/2080x828/format/jpg/quality/80/interlace/1' />}
  >
            <Meta
              title='碧蓝航线'
              description='此身为舰，即刻出战！周年庆·第一弹开展中'
    />
          </Card>
        </Link>
        <Link to='/game/5b0b823dc4fc6b790c21fb13'>
          <Card
            hoverable
            cover={<img src='https://img.tapimg.com/market/images/cec52069510729184d805c4e31cbda0b.jpg?imageMogr2/auto-orient/thumbnail/2080x/strip/gravity/Center/crop/2080x828/format/jpg/quality/80/interlace/1' />}
  >
            <Meta
              title='密室逃脱绝境系列3画仙奇缘'
              description='体验琴棋书画的魅力，逃脱扑朔迷离的密室。'
    />
          </Card>
        </Link>
        <Link to='/game/5b0b87a6c4fc6b790c21fb17'>
          <Card
            hoverable
            cover={<img src='https://img.tapimg.com/market/images/c937ef8159f3bc733eb0af88904a6f02.png?imageMogr2/auto-orient/thumbnail/2080x/strip/gravity/Center/crop/2080x828/format/jpg/quality/80/interlace/1' />}
  >
            <Meta
              title='同步音律'
              description='指尖乐曲，解我心意。'
    />
          </Card>
        </Link>
        <Link to='/game/5b0b7732c4fc6b790c21fb02'>
          <Card
            hoverable
            cover={<img src='https://img.tapimg.com/market/images/131465cab220a1c917f66d6eb02f7abf.jpg?imageMogr2/auto-orient/thumbnail/2080x/strip/gravity/Center/crop/2080x828/format/jpg/quality/80/interlace/1' />}
  >
            <Meta
              title='FIFA足球世界'
              description='正统FIFA授权手游，近距离感受足球的魅力。'
    />
          </Card>
        </Link>
        <Link to='/game/5b0b8106c4fc6b790c21fb11'>
          <Card
            hoverable
            cover={<img src='https://img.tapimg.com/market/images/ce195e89e1b1154f08c6ed8760357eff.jpg?imageMogr2/auto-orient/thumbnail/2080x/strip/gravity/Center/crop/2080x828/format/jpg/quality/80/interlace/1' />}
  >
            <Meta
              title='虚荣 (Vainglory)'
              description='摇杆+点触双模式操作，真竞技MOBA手游。'
    />
          </Card>
        </Link>
      </div>
    )
  }
}

export default withRouter(Home)
