import { LogoutOutlined, SettingOutlined, ProfileFilled, FieldTimeOutlined, TeamOutlined, DashboardOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu, Modal, Popconfirm, message } from 'antd';
import Button from "antd-button-color";
import { Route, Routes, useNavigate, useLocation, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Client from "./client";

const Configuration = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { Header, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(true);
    const [current, setCurrent] = useState(location.pathname);
    const token = sessionStorage.getItem("token");
    const mail = sessionStorage.getItem("Email");
    const [username, setUsername] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const clientdtl = async () => {
        const response = await axios(`/api/log/userprofile/${mail}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setUsername(response.data.Username);
    }

    useEffect(() => {
        clientdtl();
    }, []);


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
        getItem("Client", "", <DashboardOutlined />),
        getItem("Project", "configuration", <SettingOutlined />),
        getItem("Designation", "timesheetstatus", <FieldTimeOutlined />),
        getItem("Employee Type", "employees", <TeamOutlined />),
        getItem("HR Contact Info", "userprofile", <ProfileFilled />)
    ];

    return (
        <Layout style={{ position: "fixed", width: "100%", height: "100%" }}>

            <Layout>

                <Content>
                    <Button style={{ marginRight: '900px' }}>
                        <Link to="/Home/configuration/Client">Client</Link>
                    </Button>
                    <Routes>
                        <Route path="/Client" element={<Client />} />
                        <Route path="" />
                        <Route path="" />
                    </Routes>
                </Content>
            </Layout >
        </Layout >
    )
}

export default Configuration;