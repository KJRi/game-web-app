// @flow
import React from 'react'
import styles from './IndexList.css'
import { Card, Row, Col, Icon } from 'antd'
import { withRouter } from 'react-router'

type Props = {
  history: Object
}
type State = {
}

class IndexList extends React.PureComponent<Props, State> {
  enterList: Function
  constructor (props: Props) {
    super(props)
    this.state = {
    }
    this.enterList = this.enterList.bind(this)
  }
  enterList (tag: String) {
    this.props.history.push(`/tagPost/${tag}`)
  }
  render () {
    const listData = [
      {
        key: 0,
        title: '本地资讯',
        description: '查看当地最及时的第一手咨询'
      },
      {
        key: 1,
        title: '邻里讨论',
        description: '不如进来看看大家都在讨论些什么吧'
      },
      {
        key: 2,
        title: '二手市场',
        description: '可以来这里卖掉您的闲置物品或者来淘一淘精美二手闲置吧'
      },
      {
        key: 3,
        title: '同城交友',
        description: '来寻找与你志同道合的朋友吧'
      },
      {
        key: 4,
        title: '房屋租赁',
        description: '找房租房-发布租房信息'
      }
    ]
    console.log(listData)
    return (
      <div className={styles['card-list']}>
        {
          listData && listData.map((list, index) => {
            let bgColor
            if (index === 0) {
              bgColor = '#89c3f8'
            } else if (index === 1) {
              bgColor = '#bc8dee'
            } else if (index === 2) {
              bgColor = '#89a8f8'
            } else if (index === 3) {
              bgColor = '#f8d589'
            } else if (index === 4) {
              bgColor = '#ffa897'
            }
            return (
              <Row gutter={24} style={{ marginTop: '24px' }}>
                <Col span={24}>
                  <Card style={{ backgroundColor: `${bgColor}` }}
                    title={<h2 className={styles['card-title']}
                      style={{ backgroundColor: `${bgColor}` }}><Icon type='tag' />{list.title}</h2>}
                    className={styles['card']}
                    key={index}
                    onClick={() => this.enterList(list.title)}
                    hoverable>
                    {list.description}
                  </Card>
                </Col>
              </Row>
            )
          })
        }
      </div>
    )
  }
}

export default withRouter(IndexList)
