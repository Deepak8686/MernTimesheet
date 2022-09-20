import { Card, Col, Row, Space, Avatar, notification } from "antd";
import type { NotificationPlacement } from 'antd/es/notification';
import { useEffect, useState } from "react";
import axios from "axios";
import { BorderOutlined } from "@ant-design/icons";

const Userprofile = () => {

    const token = sessionStorage.getItem("token");
    const [username, setUsername] = useState('');
    const [usermail, setUsermail] = useState('');
    const [userphone, setUserPhone] = useState('');
    const [gender, setGender] = useState('');
    const mail = sessionStorage.getItem("Email");
    const [loading, setLoading] = useState(true);

    const clientdtl = async () => {
        const response = await axios(`/api/log/userprofile/${mail}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setUsername(response.data.Username);
        setUsermail(response.data.Email_Id);
        setUserPhone(response.data.ContactNo);
        setGender(response.data.gender);
        setLoading(false);
    }

    useEffect(() => {
        clientdtl();
    }, []);

    return (
        <div>
            <Row>
                <Col span={14}>
                    <h1 style={{ fontSize: 40, textAlign: "left" }}><b>Welcome back {username},</b></h1>
                    <div style={{ marginLeft: "10%", fontSize: 20 }}>
                        <Row>
                            <Col span={7} style={{ textAlign: "left", fontSize: 20 }}>
                                <h3><b>Name:</b></h3>
                                <h3><b>Email Id: </b></h3>
                                <h3><b>Contact No:</b></h3>
                                <h3><b>Gender:</b></h3>
                            </Col>
                            <Col span={7} style={{ textAlign: "left", fontSize: 20 }}>
                                <h3><b>{username}</b></h3>
                                <h3><b>{usermail}</b></h3>
                                <h3><b>{userphone}</b></h3>
                                <h3><b>{gender}</b></h3>
                            </Col>
                        </Row>
                    </div>

                </Col>
                <Col span={10}>
                    <Avatar src="https://joeschmoe.io/api/v1/random" size={150}></Avatar>
                </Col>
            </Row>
        </div >
    )
}

export default Userprofile;