// @flow
import React, { Component } from 'react'
import { Input, Form, Icon, Button, message } from 'antd'
import styles from './Login.css'
import fetch from 'isomorphic-fetch'
const FormItem = Form.Item

class LoginFormCom extends Component {
  constructor (props) {
    super(props)
  }

  handleLogin = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        fetch('/api/user/accesstoken', {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: values.username,
            password: values.password
          })
        }).then(res => res.json())
          .then(res => {
            if (res.success) {
              message.destroy()
              message.success(res.message)
              localStorage.setItem('username', values.username)
              window.location.href = '/'
            } else {
              message.destroy()
              message.info(res.message)
            }
          })
          .catch(e => console.log('Oops, error', e))
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles.containel}>
        <h2>登录</h2>
        <Form onSubmit={this.handleLogin} className={styles.formStyle}>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!' }]
            })(
              <Input prefix={<Icon type='phone' style={{ fontSize: 13 }} />} placeholder='username' />
                      )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }]
            })(
              <Input prefix={<Icon type='lock' style={{ fontSize: 13 }} />} type='password'
                placeholder='Password' />
                      )}
          </FormItem>
          <FormItem>
            <Button className={styles.loginButton} type='primary' htmlType='submit'>
                          登录
                      </Button>
          </FormItem>
        </Form>
        <p>没有帐号？<a href='/register'>注册</a></p>
      </div>
    )
  }
}

const LoginForm = Form.create()(LoginFormCom)

export default LoginForm
