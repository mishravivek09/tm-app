import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Checkbox, notification, Form, Input, message } from "antd"
import React, { useContext } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { LoginContext } from "../contexts/LoginContext"
const LoginForm = () => {
    const {handleLoginUpdate}=useContext(LoginContext);
    const navigate=useNavigate();
    const onFinish = (value) => {
        const userData = {
            email: value.email,
            password: value.password
        }
        validateUser(JSON.stringify(userData));
    }
    const validateUser = async (data) => {
        const req = await fetch(`https://task-management-app-production.up.railway.app:443/user/validate`, {
            method: "post",
            body: data,
            headers: {
                "content-type": "application/json"
            }
        });
        req.status == 200 ? message.success({ content: "Logged in successfully" }) : message.error({ content: "Invalid username or password" });
        try {
            const res = await req.json();
            if(res.email !=null){ 
                handleLoginUpdate(res);
                navigate("/");
            }
            res.message != "Invalid username or password" ? notification.success({ message: "Welcome", description: `${res.firstName} ${res.lastName}`, placement: "bottomLeft" }) : notification.error({ message: res.message, description: "Please try again!", placement: "bottomLeft" });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{ width: "100%", height: "100vh", backgroundColor: "#fff" }}>
            <div>
                <h2 style={{ margin: "20px" }}>Login</h2>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your Password!',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button style={{ width: "100%", marginBottom: "20px" }} type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or  <Link to={"/signup"}>register now!</Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default LoginForm