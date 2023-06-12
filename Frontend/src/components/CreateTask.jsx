import { CloseOutlined } from '@ant-design/icons'
import React, { useContext } from 'react'
import { FormContext } from '../contexts/FormContext'
import { Button, Form, Input, message } from 'antd'
import { LoginContext } from '../contexts/LoginContext'
import { TaskContext } from '../contexts/TaskContext'

const CreateTask = () => {
    const { showForm, handleShowForm } = useContext(FormContext)
    const { login } = useContext(LoginContext);
    const {handleUpdate } = useContext(TaskContext);
    const handleCloseForm = () => {
        handleShowForm(false);
    }
    const saveData = (values) => {
        const taskData = {
            deadline: values.deadline,
            title: values.title,
            description: values.description
        }
        const data = JSON.stringify(taskData);
        createNewTask(data);
    }
    const createNewTask = async (data) => {
        const req = await fetch(`https://task-management-app-production.up.railway.app:443/task/create?userId=${login.userId}`, {
            method: "POST",
            body: data,
            headers: {
                "content-type": "application/json"
            }
        });
        try {
            const res = await req.json();
            if(res.message==null){
                getAllTTasks(login.userId);
            }
            res.message == null ? message.success({ content: "Task created successfully" }) : message.error({ content: res.message });
        } catch (error) {
            console.log(error)
        }
    }
    const getAllTTasks = async (id) => {
        const req = await fetch(`https://task-management-app-production.up.railway.app:443/task/get?userId=${id}`);
        try {
            const res = await req.json();
            handleUpdate(res);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="overlay" style={showForm ? { display: "block" } : { display: "none" }}>
            <span className="closebtn" title="Close Form" onClick={handleCloseForm}><CloseOutlined style={{ fontSize: "30px" }} /></span>
            <div className="overlay-content">
                <Form style={{ textAlign: "center" }} onFinish={saveData}>
                    <Form.Item
                        name={'title'}
                        rules={[
                            {
                                min: 3,
                                message: "Title Should be greater than 2 characters"
                            }
                        ]}
                    >
                        <Input required style={{ padding: "10px", borderRadius: "10px" }} placeholder='Title' type="text" />
                    </Form.Item>
                    <Form.Item name={'deadline'}>
                        <Input placeholder='Deadline' style={{ padding: "10px", borderRadius: "10px" }} name='deadline' required type="datetime-local" />
                    </Form.Item>
                    <Form.Item name={'description'}>
                        <Input.TextArea required placeholder='Enter task description' style={{ borderRadius: "10px", padding: "10px" }} name='description' cols="30" rows="10"></Input.TextArea>
                    </Form.Item>
                    <Button size='large' type='primary' htmlType='submit'>Submit</Button>
                </Form>
            </div>
        </div>
    )
}

export default CreateTask