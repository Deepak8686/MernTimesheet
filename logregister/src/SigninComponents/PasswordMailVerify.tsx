import { Row, Col, Form, Input, Button, message, Space } from 'antd';
import { SendOutlined } from "@ant-design/icons";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';


const Passwordmailverify = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [form1] = Form.useForm();
    const [loadings, setLoadings] = useState(false);
    const [disable, setDisable] = useState(true);
    const [Email_Id, setEmail_Id] = useState('');
    const [otp, setOtp] = useState(0);
    const [enableCounter, setEnableCounter] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [counter, setCounter] = useState(90);

    useEffect(() => { Email_Id.length == 0 || enableCounter ? setShowButton(false) : setShowButton(true); }, [Email_Id, enableCounter]);

    useEffect(() => {
        counter > 0 && enableCounter && setTimeout(() => setCounter(counter - 1), 1000);
        counter == 0 && setEnableCounter(false);
    }, [counter, enableCounter, loadings]);

    const sendOtp = () => { form1.validateFields().then(sendOtps) }
    const sendOtps = async () => {
        setLoadings(true);
        await axios({
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            url: "/api/log/sentmail",
            data: {
                Email_Id,
                type: "CHANGE_PASSWORD"
            }
        }).then((r) => {
            message.success("otp sent successful");
            setCounter(90);
            setEnableCounter(true);
            setShowButton(false);
            setDisable(false);
        }).catch((error) => {
            message.error(error.response.data.error);
        })
        setLoadings(false);
    }
    const verfiyMail = () => { form.validateFields().then(verfiyMails) }
    const verfiyMails = async () => {
        await axios({
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            url: "/api/log/verifyotp",
            data: {
                id: Email_Id,
                otp
            }
        }).then((r) => {
            debugger;
            sessionStorage.setItem("passemail", Email_Id);
            message.success("Email verified successfully");
            navigate('/changepassword')
        }).catch((error) => {
            message.error(error.response.data.error);
        })
    }

    return (
        <div className='loginHead'>
            <Row>
                <Col span={7}>
                    <div>
                        <h1 style={{ fontSize: 70, color: "white", marginTop: "25%" }}>MMM</h1>
                        <h1 style={{ fontSize: 35, color: "white", marginTop: "-10%" }}>SOLUTIONS</h1>
                    </div>
                    <div style={{ position: "fixed", marginTop: "10%", marginLeft: "8%" }}>
                        <p style={{ color: "white" }}>Back to Login</p>
                        <Button style={{ borderRadius: 15, tabSize: 20 }}><Link to='/'><b>Login</b></Link></Button>
                    </div>
                </Col>
                <Col span={17}>
                    <h1 style={{ color: "white", marginTop: 30 }}><b>CHANGE PASSWORD</b></h1>
                    <Form className='registerContent' form={form} layout="vertical" name="form_in_modal">
                        <Row style={{ marginTop: 50 }}>
                            <Col span={5} className='content1'>

                                <h3 style={{ fontWeight: "bold" }}>Email ID</h3><br />

                                <h3 style={{ fontWeight: "bold" }}>Enter OTP</h3>

                            </Col>

                            <Col span={8} className='content2'>
                                <Form form={form1}>
                                    <Space dir='horizantal'>
                                        <Form.Item name="Email_Id" rules={[{ required: true, message: 'Please enter the Email_Id' }, {
                                            pattern: new RegExp(/^([a-z0-9-_\.]+)@([a-z0-9]+)\.([a-z]{2,10})(\.[a-z]{2,8})?$/),
                                            message: "Enter Valid Email"
                                        }]}>
                                            <Input type='text' id='Email_Id' value={Email_Id} placeholder="Enter Email" style={{ width: 250 }}
                                                onChange={(e) => setEmail_Id(e.target.value)}
                                            />
                                        </Form.Item>
                                        <div style={{ marginTop: "-22%" }}>
                                            <Button type='primary'
                                                onClick={sendOtp}
                                                icon={!enableCounter && <SendOutlined />}
                                                disabled={!showButton}
                                                loading={loadings}
                                                style={{ height: 31 }}
                                            >
                                                {
                                                    enableCounter ? counter + " seconds" : "Send Otp"
                                                }
                                            </Button>
                                        </div>
                                    </Space>
                                </Form>
                                <Form.Item name="otp" rules={[{ required: true, message: 'Enter otp number' }]}>
                                    <Input type='text' placeholder='Enter OTP' style={{ width: 340, marginLeft: -20 }}
                                        onChange={(e) => setOtp(parseInt(e.target.value))} />
                                </Form.Item>
                                <Button type='primary' onClick={verfiyMail} disabled={disable} style={{ marginLeft: 10 }}>Verify Email</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Passwordmailverify;