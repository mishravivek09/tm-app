import { Button, List, Pagination } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CreateTask from '../components/CreateTask'
import SideBar from '../components/SideBar'
import TaskCard from '../components/TaskCard'
import { LoginContext } from '../contexts/LoginContext'
import { TaskContext } from "../contexts/TaskContext"
const Home = () => {
  const { login } = useContext(LoginContext);
  const { data, handleUpdate } = useContext(TaskContext);
  const [allTask, setAllTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const updatePage = (value) => {
    setCurrentPage(value);
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
  const displayTasks = (currentPage, data) => {
    const startIndex = (currentPage - 1) * 6;
    const endIndex = startIndex + 6;
    const pageData = data.slice(startIndex, endIndex);
    setAllTasks(pageData);
  }
  useEffect(() => {
    if (data.length != 0 && data.message==null) {
      displayTasks(currentPage, data);
    }
  }, [currentPage, data])

  useEffect(() => {
    if (login != null) {
      getAllTTasks(login.userId);
    }
  }, [])
  return (
    <>
      <CreateTask />
      <div style={{ display: "flex", justifyContent: "space-between"}}>
        <div className='content'>
          {
            login == null ? <span style={{fontSize: "25px", color: "#fff", fontWeight: "bolder", textShadow: "1px 1px black" }}>You want to manage your task  <span><Link to={"/login"}><Button type='primary'>Get Started</Button></Link></span></span> : data.message!=null ? <span style={{ fontSize: "25px", color: "#fff", fontWeight: "bolder", textShadow: "1px 1px black" }}>Create Task Now !</span> :
              <>
                <List
                  grid={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 3, xxl: 4 }}
                  dataSource={allTask}
                  renderItem={(elem) => {
                    return <TaskCard props={elem} key={elem.taskId} />
                  }}
                />
                <Pagination
                  style={{ float: "left",backgroundColor: "whitesmoke", fontWeight: "bolder", padding: "10px", borderRadius: "10px", margin: "15px" }}
                  responsive={true}
                  current={currentPage}
                  onChange={updatePage}
                  pageSize={6}
                  total={data.length}
                  showSizeChanger={false}
                />
              </>

          }
        </div>
        <div className='sideBarDiv'><SideBar /></div>
      </div>
    </>
  )
}

export default Home