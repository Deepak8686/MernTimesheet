import { Row, Col, Input, Form, Radio, message } from 'antd';
import Button from 'antd-button-color';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register: React.FC = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [Username, setUsername] = useState('');
    const [ContactNo, setContactNo] = useState('');
    const [password, setpassword] = useState('');
    const [gender, setGender] = useState('');
    const emails = sessionStorage.getItem('email')

    const senddata = () => {
        form.validateFields().then(() => {
            registerdtls();
        })
            .catch(() => {
                message.error("Pls, Fill the required fields as required");
            });
    }
    const oncancel = () => {
        form.resetFields();
    }

    const registerdtls = async () => {
        await axios({
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            url: "/api/log/register",
            data: {
                Username,
                Email_Id: emails,
                ContactNo,
                gender,
                password
            }
        }).then((r) => {
            message.success(Username + " Registered Successful")
            form.resetFields();
            navigate('/');
        }).catch((error) => {
            message.error(error.response.data.error);
        })
    }
    return (
        <div className='loginHead'>
            <Row>
                <Col span={6}>
                    <div>
                        <h1 style={{ fontSize: 70, color: "white", marginTop: "50%" }}>MMM</h1>
                        <h1 style={{ fontSize: 35, color: "white", marginTop: "-20%" }}>SOLUTIONS</h1>
                    </div>
                    {/* <div style={{ position: "fixed", marginTop: "33%", marginLeft: "5%" }}>
                        <p style={{ color: "white", position: "fixed" }}>If you already registered</p>
                        <Button style={{ borderRadius: 15, tabSize: 20, position: "fixed", marginTop: "3%", marginLeft: "3%" }}><b>Login</b></Button>
                    </div> */}
                </Col>
                <Col span={18}>
                    <h1 style={{ color: "white", marginTop: 30 }}><b>REGISTER</b></h1>
                    <Form className='registerContent' form={form} layout="vertical" name="form_in_modal">
                        <Row>
                            <Col span={5} className='content1'>
                                <h3 style={{ fontWeight: "bold" }}>Email ID</h3><br />

                                <h3 style={{ fontWeight: "bold" }}>Username</h3><br />

                                <h3 style={{ fontWeight: "bold" }}>Contact No</h3><br />

                                <h3 style={{ fontWeight: "bold" }}>Password</h3><br />

                                <h3 style={{ fontWeight: "bold" }}>Confirm Password</h3><br />

                                <h3 style={{ fontWeight: "bold" }}>Gender</h3>
                            </Col>

                            <Col span={6} className='content2'>

                                <p style={{ marginLeft: "-30%", marginTop: "2%" }}><b>{emails}</b></p>

                                <Form.Item style={{ marginTop: "7%" }} name="Username" rules={[{ required: true, message: 'Please enter the Name' }, {
                                    pattern: new RegExp(/^[a-z A-Z]+$/i),
                                    message: "It does not accept numbers and special characters"
                                }]}>
                                    <Input type='text' id='Username' value={Username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Form.Item>

                                <Form.Item name="ContactNo" rules={[{ required: true, message: 'Please enter the ContactNo' }, {
                                    pattern: new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
                                    message: "Enter Valid Phone Number"
                                }]}>
                                    <Input type="text" id='ContactNo' value={ContactNo}
                                        onChange={(e) => setContactNo(e.target.value)}
                                    />
                                </Form.Item>

                                <Form.Item name="password" rules={[{ required: true, message: 'Please enter the password' }, {
                                    pattern: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/),
                                    message: "8 to 24 characters.Must begin with a Letters, numbers, underscores, hyphens allowed."
                                }]}>
                                    <Input.Password type="text" id='password' value={password}
                                        onChange={(e) => setpassword(e.target.value)}
                                    />
                                </Form.Item>

                                <Form.Item name="confirmPassword" dependencies={["password"]}
                                    hasFeedback
                                    rules={[{ required: true, message: 'Please confirm the password' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("password") === value)
                                                return Promise.resolve();

                                            return Promise.reject(
                                                new Error("The two passwords that you entered do not match!")
                                            );
                                        },
                                    })
                                    ]}>
                                    <Input.Password type="text" id='confirmPassword' />
                                </Form.Item>

                                <Form.Item
                                    name="gender"
                                    rules={[{ required: true, message: "Please select an option!" }]}        >
                                    <Radio.Group onChange={(e) => setGender(e.target.value)} value={gender}>
                                        <Radio value="male">Male</Radio>
                                        <Radio value="female">Female</Radio>
                                        <Radio value="other">Other</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Button type="danger" onClick={oncancel}>Cancel</Button>
                                <Button type='primary' style={{ marginLeft: 10 }} onClick={senddata}>Register</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Register;