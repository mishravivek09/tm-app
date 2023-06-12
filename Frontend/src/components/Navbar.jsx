import { HomeOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons"
import { Drawer, Menu, Select } from "antd"
import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { LoginContext } from '../contexts/LoginContext'
import SideBar from "./SideBar"
const Navbar = () => {
  const { login, handleLoginUpdate } = useContext(LoginContext);
  const{pathname}=useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const handleChange = (value) => {
    if (value == "logout") {
      handleLoginUpdate(null);
    }
  }

  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate(e.key);
    setOpenMenu(false);
  }

  const AppMenu = ({ isInline = false }) => {
    return (
      <Menu
      selectedKeys={pathname}
        style={{ backgroundColor: "#009DFF", color: "#fff", border: "none", fontSize: "20px" }}
        mode={isInline ? 'inline' : 'horizontal'}
        items={
          [
            {
              label: "Home",
              key: "/",
              icon: <HomeOutlined />,
              onClick: handleClick
            },
            {
              label: login == null ? "Login" : <Select
                style={{
                  width: 120
                }}
                defaultValue={login.firstName}
                onChange={handleChange}
                options={[
                  {
                    value: login.firstName,
                    label: login.firstName,
                  },
                  {
                    value: "logout",
                    label: "Logout"
                  }
                ]}
              />,
              key: "login",
              icon: <UserOutlined />,
              onClick: login == null ? handleClick : null
            }
          ]
        }
      />
    )
  }
  return (
    <nav style={{ backgroundColor: "#009DFF", top: "0", width: "100%", zIndex: "55", position: "sticky", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 15px" }}>
      <div>
        <Link style={{ textDecoration: "none" }} to={"/"}><h1 style={{ color: "#fff", fontWeight: "800", textShadow: "1px 1px black" }}>TM_APP</h1></Link>
      </div>
      <div className="menuIcon">
        <MenuOutlined onClick={() => setOpenMenu(true)} style={{ color: "#fff", fontSize: "30px" }} />
      </div>
      <span className="menu"><AppMenu /></span>
      <Drawer title='TM_APP' width={'70%'} open={openMenu} onClose={() => setOpenMenu(false)} bodyStyle={{ backgroundColor: "#009DFF" }}>
        <AppMenu isInline />
        <span onClick={()=>setOpenMenu(false)}><SideBar/></span>
      </Drawer>
    </nav>
  )
}

export default Navbar