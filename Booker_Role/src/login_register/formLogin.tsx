import { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import "./login.css"
import axios from 'axios';


const LoginForm: React.FC = () => {
  // const onFinish = async (values: any) => {
  //   console.log('Received values of form: ', values);
  // };
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
     
      const response = await axios.post("http://localhost:8000/api/v1/login ", values);
      
      const token = response.data.token
      console.log(token)
      if (token) {
        localStorage.setItem("token", token);
        navigate("/");
      }

      
    } catch (error) {
      console.error('Error login account:', error);
      // Handle error or show error messages to the user
    }}

  return (
    <div>
      <h1 style={{textAlign:"center" ,marginBottom:"40px"}}>Login</h1>
     
      
    <Form
    
    
    name="normal_login"
    className="login-form"
    initialValues={{ remember: true }}
    onFinish={onFinish}
  >
    <Form.Item
      name="email"
      rules={[{ required: true, message: 'Please input your Email!' }]}
    >
      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[{ required: true, message: 'Please input your Password!' }]}
    >
      <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
        type="password"
        placeholder="Password"
      />
    </Form.Item>
    <Form.Item>
      <Form.Item name="remember" valuePropName="checked" noStyle>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <a className="login-form-forgot" href="/forgot-password">
        Forgot password
        
      </a>
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit" className="login-form-button">
        Log in
      </Button>
      <br></br>
      
      Or <a href="/register" >register now!</a>
    </Form.Item>
  </Form>
    </div>
  );
};

export default LoginForm;
