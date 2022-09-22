import { Card, Col, Row, Space, Avatar, notification } from "antd";
import type { NotificationPlacement } from 'antd/es/notification';
import { useEffect, useState } from "react";
import axios from "axios";
import { BorderOutlined } from "@ant-design/icons";

const Userprofile = () => {

    const token = sessionStorage.getItem("token");
    const [Firstname, setFirstname] = useState('');
    const [Lastname, setLastname] = useState('');
    const [usermail, setUsermail] = useState('');
    const [userphone, setUserPhone] = useState('');
    const [Employeecode, setEmployeecode] = useState('');
    const mail = sessionStorage.getItem("Email");
    const [loading, setLoading] = useState(true);

    const clientdtl = async () => {
        const response = await axios(`/api/log/userprofile/${mail}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setFirstname(response.data.Firstname);
        setLastname(response.data.Lastname);
        setUsermail(response.data.Email_Id);
        setUserPhone(response.data.ContactNo);
        setEmployeecode(response.data.Employeecode);
        setLoading(false);
    }

    useEffect(() => {
        clientdtl();
    }, []);

    return (
        <div>
            <Row>
                <Col span={14}>
                    <h1 style={{ fontSize: 40, textAlign: "left" }}><b>Welcome back {Firstname + " " + Lastname},</b></h1>
                    <div style={{ marginLeft: "10%", fontSize: 20 }}>
                        <Row>
                            <Col span={7} style={{ textAlign: "left", fontSize: 20 }}>
                                <h3><b>Name:</b></h3>
                                <h3><b>Email Id: </b></h3>
                                <h3><b>Contact No:</b></h3>
                                <h3><b>Employeecode:</b></h3>
                            </Col>
                            <Col span={7} style={{ textAlign: "left", fontSize: 20 }}>
                                <h3><b>{Firstname + " " + Lastname}</b></h3>
                                <h3><b>{usermail}</b></h3>
                                <h3><b>{userphone}</b></h3>
                                <h3><b>{Employeecode}</b></h3>
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