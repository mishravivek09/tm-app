import React, { useContext } from 'react'
import { CheckOutlined, ClockCircleOutlined, PlusOutlined, SwapOutlined } from '@ant-design/icons'
import { FormContext } from '../contexts/FormContext'
import { LoginContext } from '../contexts/LoginContext';
import { message, notification } from 'antd';
import { TaskContext } from '../contexts/TaskContext';
const SideBar = () => {
    const { handleShowForm } = useContext(FormContext);
    const { login } = useContext(LoginContext);
    const { handleUpdate } = useContext(TaskContext);
    const handleCreateTask = () => {
        if (login) {
            handleShowForm(true);
        } else {
            notification.warning({ message: "Authentication Required", description: "You must first log in before using the application", placement: "bottomRight" })
        }
    }
    const handleFilter = async (filter, value) => {
        if (login) {
            const req = await fetch(`https://task-management-app-production.up.railway.app:443/task/${filter}/${value}/${login.userId}`);
            try {
                const res = await req.json();
                if (res.message == null) {
                    handleUpdate(res);
                } else {
                    message.error({ content: res.message });
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            notification.warning({ message: "Authentication Required", description: "You must first log in before using the application", placement: "bottomRight" })
        }
    }

    return (
        <div className='sideBar'>
            <div className='options' onClick={handleCreateTask} ><span><PlusOutlined /></span> Create New Task</div>
            <div className='options' onClick={() => handleFilter("filter", "pending")} ><span><ClockCircleOutlined /></span> Pending Tasks</div>
            <div className='options' onClick={() => handleFilter("filter", "completed")} ><span><CheckOutlined /></span> Completed Tasks</div>
            <div className='options' onClick={() => handleFilter("sort", "title")} ><span><SwapOutlined /></span> Sort By Name</div>
            <div className='options' onClick={() => handleFilter("sort", "latest")} ><span><SwapOutlined /></span> Sort By Latest</div>
            <div className='options' onClick={() => handleFilter("sort", "oldest")} ><span><SwapOutlined /></span> Sort By Oldest</div>
        </div>
    )
}

export default SideBar