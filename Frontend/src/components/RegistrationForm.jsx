import { LockOutlined, MobileOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Radio, notification } from "antd";
import React from 'react';
import { Link } from "react-router-dom";

const RegistrationForm = () => {
    const onFinish = (values) => {
      const userData = {
        email: values.username,
        firstName: values.firstname,
        lastName: values.lastname,
        password: values.confirm,
      }
      registerUser(userData);
    };

    const registerUser = async (data) => {
  
      const jsonData = JSON.stringify(data);
  
      const req = await fetch("https://task-management-app-production.up.railway.app:443/user/register", {
        method: "post",
        body: jsonData,
        headers: {
          "content-type": "application/json"
        }
      });
      try {
        const res = await req.json();
        res.email != null ? notification.success({ message: "Registration success", description: `Signed up successfully !`, placement: "bottomLeft" }): res.message.includes("Validation") ? notification.warning({message:"Validation Error !",description:res.details}) : notification.error({ message: "Signup unsuccessful !", description: res.message, placement: "bottomLeft" });
  
      } catch (error) {
        console.log(error);
      }
    }
  
  
    return (
      <div style={{ width: "100%", height: "112vh", backgroundColor: "#fff" }}>
        <div>
          <h2 style={{ margin: "20px" }}>Signup</h2>
          <Form
            onFinish={onFinish}
          >
            <Form.Item
              name="firstname"
              rules={[
                {
                  required: true,
                  min:3,
                  message: 'Firstname should be greater than 2 characters',
                },
              ]}
            >
              <Input placeholder='First Name' />
            </Form.Item>
            <Form.Item
              name="lastname"
              rules={[
                {
                  required: true,
                  min:3,
                  message: 'Lastname should be greater than 2 characters',
                },
              ]}
            >
              <Input placeholder='Last Name' />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
            >
              <Input type="email" prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder='Confirm Password' />
            </Form.Item>
            <Form.Item>
              <Button style={{ width: "100%", marginBottom: "20px" }} type="primary" htmlType="submit">
                Signup
              </Button>
              <br />
              Or <Link to={"/login"}>Already have an account ?</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
}

export default RegistrationForm