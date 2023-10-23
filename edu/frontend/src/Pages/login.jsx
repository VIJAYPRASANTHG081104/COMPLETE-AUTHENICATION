import React from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import './../Styles/Authentication.css'
import {Link} from 'react-router-dom'
import axios from "axios"

const Login = () => {

  const login = async (values) => {
    // console.log(values)
    // try {
    //   const result = await axios.post('http://localhost:4000/api/user/auth/login', values);
    //   console.log('success')
    //   console.log(result.data);
    // } catch (error) {
    //   console.error('Error during login request:', error);
    //   message.error('login failed')
    // }
  };
  

  return (
    <div className='authForm'>
      <Form
      className='authFormInside' 
      onFinish={login}
      >
      <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Link to={'/register'}>Click here to register</Link>
      <Button type="primary" htmlType="submit">
        Login
      </Button>
    </Form.Item>
      </Form>
    </div>
  )
}

export default Login