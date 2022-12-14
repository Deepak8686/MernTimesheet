import { LogoutOutlined, SettingOutlined, ProfileFilled, FieldTimeOutlined, TeamOutlined, DashboardOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu, Modal, Popconfirm, message } from 'antd';
import Button from "antd-button-color";
import { Route, Routes, Link, useNavigate, useLocation, BrowserRouter } from "react-router-dom";
import Getemployee from "./Employee/GetEmployee";
import { useAuthContext } from "../context/Auth/State";
import Unauthorized from '../SigninComponents/Unauthorized';
import React, { useState, useEffect } from "react";
import axios from "axios";
import './Home.css';
import Userprofile from "./Userprofile/Userprofile";
import Configuration from "./Configuration/Configuration";
import Addemployee from "./Employee/AddEmployee";
import Editemployee from "./Employee/Editemployee";

const Homes = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { Header, Sider, Content } = Layout;
    const { isAuthrozied } = useAuthContext();
    const { setToken } = useAuthContext();
    const [collapsed, setCollapsed] = useState(true);
    const [current, setCurrent] = useState(location.pathname);
    const token = sessionStorage.getItem("token");
    const mail = sessionStorage.getItem("Email");
    const [firstname, setUsername] = useState('');
    const [lastname, setLastname] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const clientdtl = async () => {
        const response = await axios(`/api/log/userprofile/${mail}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setUsername(response.data.Firstname);
        setLastname(response.data.Lastname);
    }

    useEffect(() => {
        clientdtl();
    }, []);

    const logout = () => {
        setToken({ token: "", isAuthrozied: false });
        window.sessionStorage.removeItem("token");
        window.location.reload();
        navigate('/');
    }
    const handleClick = (e: any) => {
        navigate(e.key);
    };
    useEffect(() => {
        if (location) {
            if (current !== location.pathname) {
                setCurrent(location.pathname);
            }
        }
    }, [location, current]);

    const getItem = (label: any, key: any, icon: any) => {
        return {
            key,
            icon,
            label,
        };
    };
    const items = [
        getItem("Dashboard", "", <DashboardOutlined />),
        getItem("Configuration", "configuration", <SettingOutlined />),
        getItem("Timesheet Status", "timesheetstatus", <FieldTimeOutlined />),
        getItem("Employees", "employees", <TeamOutlined />),
        getItem("User Profile", "userprofile", <ProfileFilled />)
    ];

    const text = 'Are you sure, want to Logout?';

    const modal = () => {
        setIsModalOpen(true);
    };
    const cancel = () => {
        setIsModalOpen(false);
    }

    return (
        <Layout style={{ position: "fixed", width: "100%", height: "100%" }}>
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <div className="logo" />
                <Menu
                    style={{ marginTop: "75%" }}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[""]}
                    items={items}
                    onClick={handleClick}
                />
            </Sider>
            <Layout>
                <Header style={{ backgroundColor: "white", textAlign: "end" }}>
                    <Button type="link" onClick={modal} style={{ position: "fixed", textAlign: "right", marginTop: "0.7%", marginLeft: "-4%" }} title={firstname.toLocaleUpperCase() + " " + lastname.toLocaleUpperCase()}><Avatar src="https://joeschmoe.io/api/v1/random" /></Button>
                    <Modal
                        closable={false}
                        title={<div style={{ textAlign: "center" }}><Avatar src="https://joeschmoe.io/api/v1/random" size={70} />
                            <h3 style={{ marginTop: "5%" }}>{firstname.toLocaleUpperCase() + " " + lastname.toLocaleUpperCase()}</h3></div>}
                        open={isModalOpen}
                        width={250}
                        style={{ marginLeft: "80%", width: "10%" }}
                        footer={false}
                    >
                        <Button style={{ marginLeft: "50%" }} onClick={cancel}>X</Button>
                        <Popconfirm placement="topLeft" title={text} onConfirm={logout} okText="Yes" cancelText="No">
                            <Button type="danger" title="Logout" icon={<LogoutOutlined />} style={{ marginLeft: "5%" }} />
                        </Popconfirm>
                    </Modal>
                </Header>
                <Content>
                    <Routes>
                        <Route path="/" element={<Getemployee />} />
                        <Route path="/configuration/*" element={<Configuration />} />
                        <Route path="employees" element={<Getemployee />} />
                        <Route path="userprofile" element={<Userprofile />} />
                        <Route path="addemployee" element={<Addemployee />} />
                        <Route path="editemployee" element={<Editemployee />} />
                    </Routes>
                </Content>
            </Layout >
        </Layout >
    )
}

export default Homes;