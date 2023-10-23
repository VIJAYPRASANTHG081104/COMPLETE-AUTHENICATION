import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import './../Styles/Authentication.css'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate()
  const register = async(values) => {
    console.log(values)
    const result = await axios.post('http://localhost:4000/new', values);
    console.log(result)
    navigate('/login')
  }

  return (
<div className='authForm'>
      <Form
      className='authFormInside' 
      onFinish={register}
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
      <Link to={'/login'}>Click here to Login</Link>
      <Button type="primary" htmlType="submit">
        Register
      </Button>
    </Form.Item>
      </Form>
    </div>
  )
}

export default Register