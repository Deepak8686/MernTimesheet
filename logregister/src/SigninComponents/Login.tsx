import { Row, Col, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/Auth/State';
import './Register.css';

const Login = () => {

    const { setToken } = useAuthContext();

    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [Email_Id, setEmail_Id] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const goLogin = () => {
        form.validateFields().then(() => {
            goLog();
        })
    }

    const goLog = async () => {
        setLoading(true);
        const abc = await axios({
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            url: "/api/log/Login",
            data: {
                Email_Id,
                password
            }
        }).then((r) => {
            setToken({ token: r?.data?.token, isAuthrozied: true });
            sessionStorage.setItem("token", r.data.token);
            sessionStorage.setItem("Email", Email_Id);
            message.success(r.data.success);
            navigate('/Home');


        }).catch((error) => {
            message.error(error.response.data.error);
        })
        setLoading(false);
    }
    return (
        <div className='loginHead'>
            <Row>
                <Col span={10}>
                    <div>
                        <h1 style={{ fontSize: 70, color: "white", marginTop: "25%" }}>MMM</h1>
                        <h1 style={{ fontSize: 35, color: "white", marginTop: "-10%" }}>SOLUTIONS</h1>
                    </div>
                    <div style={{ position: "fixed", marginTop: "5%", marginLeft: "15%" }}>
                        <p style={{ color: "white" }}><b>If you not registered?</b></p>
                        <Button style={{ borderRadius: 15, tabSize: 20 }}><Link to='/register'><b>Register</b></Link></Button>
                    </div>
                </Col>
                <Col span={14}>
                    <h1 style={{ color: "white", marginTop: 30 }}><b>LOGIN</b></h1>
                    <Form className='registerContent' form={form} layout="vertical" name="form_in_modal">
                        <Row style={{ marginTop: 50 }}>
                            <Col span={4} className='content1'>

                                <h3 style={{ fontWeight: "bold", fontSize: 25 }}>Email ID</h3><br /><br />

                                <h3 style={{ fontWeight: "bold", marginTop: "-5%", fontSize: 25 }}>Password</h3>

                            </Col>

                            <Col span={5} className='content2'>

                                <Form.Item name="Email_Id" rules={[{ required: true, message: 'Please enter the Email_Id' }, {
                                    pattern: new RegExp(/^([a-z0-9-_\.]+)@([a-z0-9]+)\.([a-z]{2,10})(\.[a-z]{2,8})?$/),
                                    message: "Enter Valid Email"
                                }]}>
                                    <Input type='text' id='Email_Id' value={Email_Id} placeholder="Enter Email" style={{ width: 250 }}
                                        onChange={(e) => setEmail_Id(e.target.value)}
                                    />
                                </Form.Item>
                                <Button type='link' style={{ marginLeft: "50%" }}><Link to='/passwordmailverify'>Forgot Password?</Link></Button>
                                <Form.Item name="password" rules={[{ required: true, message: 'Please enter the password' }, {
                                    pattern: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/),
                                    message: "8 to 24 characters.Must begin with a Letters, numbers, underscores, hyphens allowed."
                                }]}>
                                    <Input.Password type='text' placeholder='Enter Password' style={{ width: 250 }}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </Form.Item>
                                <Button type='primary' onClick={goLogin} loading={loading} style={{ marginLeft: 10 }}>Login</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Login;