// @flow
import React, { Component } from 'react'
import { Input, Form, Icon, Button, message, DatePicker, Cascader } from 'antd'
import styles from './EditUserInfo.css'
import data from 'data'
import moment from 'moment'
import ImageUpload from 'components/ImageUpload'
const FormItem = Form.Item
const dateFormat = 'YYYY-MM-DD'
type Props = {
  form: Object
}
type State = {
  imageUrl: String
}

class EditUserInfo extends React.PureComponent<Props, State> {
  constructor (props) {
    super(props)
    this.state = {
      imageUrl: ''
    }
  }
  componentWillMount () {
    const { form } = this.props
    const username = localStorage.getItem('username')
    fetch(`/info/get?username=${username}`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
      form.setFieldsValue({
        description: res.description
      })
      this.setState({
        imageUrl: res.headerImg
      })
    })
  }
  // 提交信息
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const url = this.state.imageUrl
        const username = localStorage.getItem('username')
        let arr = {
          username: username,
          description: values.description,
          birthday: moment(values.birthday).format(dateFormat),
          location: values.location,
          imageUrl: url
        }
        console.log(arr)
        fetch('/info/editInfo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            description: values.description,
            birthday: moment(values.birthday).format(dateFormat),
            location: values.location,
            imageUrl: url
          })
        }).then(res => res.json())
        .then(res => {
          // 后台端口请求正确
          if (res.success) {
            message.destroy()
            message.success(res.message)
            window.location.href = '/personal'
          } else {
            // 失败时报错
            message.destroy()
            message.info(res.message)
          }
        })
        .catch(e => console.log('Oops, error', e))
      }
    })
  }
  getImage = (imageUrl: String) => {
    const url = imageUrl
    this.setState({
      imageUrl: url
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles['containel']}>
        <ImageUpload getImage={this.getImage} />
        <Form onSubmit={this.handleSubmit} className={styles.formStyle}>
          <FormItem label='个性签名'>
            {getFieldDecorator('description')(
              <Input prefix={<Icon type='edit' style={{ fontSize: 13 }} />} placeholder='个性签名' />
                      )}
          </FormItem>
          <FormItem label='您的生日'>
            {getFieldDecorator('birthday')(
              <DatePicker style={{ width: '100%' }} />
                      )}
          </FormItem>
          <FormItem label='地区'>
            {getFieldDecorator('location')(
              <Cascader
                options={data} className={styles['type-item']} placeholder='请选择所在地区' />
                )}
          </FormItem>
          <FormItem>
            <Button className={styles.loginButton} type='primary' htmlType='submit'>
                          确认更改
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
const EditUserInfoForm = Form.create()(EditUserInfo)

export default EditUserInfoForm
