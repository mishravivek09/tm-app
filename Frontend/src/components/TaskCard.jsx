import { Button, Card, Select, message } from 'antd'
import React, { useContext } from 'react'
import { TaskContext } from '../contexts/TaskContext';
import { LoginContext } from '../contexts/LoginContext';

const TaskCard = ({ props }) => {
  const { taskId, createdAt, deadline, description, status, title } = props;
  const { login } = useContext(LoginContext);
  const {handleUpdate } = useContext(TaskContext);
  const deleteTask = async () => {
    const req = await fetch(`https://task-management-app-production.up.railway.app:443/task/delete/${taskId}`, {
      method: "DELETE"
    })
    try {
      const res = await req.json();
      if(res.message==null){
        getAllTTasks(login.userId);
      }
      res.message == null ? message.success({ content: "Task deleted successfully" }) : message.error({ content: res.message });
    } catch (error) {
      console.log(error)
    }
  }
  const updateStatus = async (value) => {
    const req = await fetch(`https://task-management-app-production.up.railway.app:443/task/update/${taskId}?status=${value}`,{
      method:"PUT"
    });
    try {
      const res = await req.json();
      if(res.message==null){
        getAllTTasks(login.userId);
      }
      res.message==null?message.success({content:"Status updated successfully"}):message.error({content:res.message});
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
    <Card title={title} style={{
      margin: "10px",
    }}>
      <p>{description}</p>
      <Select
        defaultValue={status}
        onChange={updateStatus}
        style={
          {
            width: "150px",
          }
        }
        options={
          [
            {
              value: status,
              label: status
            },
            {
              value: status == "PENDING" ? "COMPLETED" : "PENDING",
              label: status == "PENDING" ? "COMPLETED" : "PENDING"
            }
          ]
        }
      />
      <p><span>Created At</span> - {new Date(createdAt).toDateString()} | <span>{new Date(createdAt).toLocaleTimeString()}</span></p>
      <p><span>Deadline</span> - {new Date(deadline).toDateString()} | <span>{new Date(deadline).toLocaleTimeString()}</span></p>
      <Button onClick={deleteTask} type='primary' size='small' danger>Delete</Button>
    </Card>
  )
}

export default TaskCard