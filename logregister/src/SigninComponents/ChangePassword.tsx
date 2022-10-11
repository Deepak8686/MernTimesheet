import { Form, Input, Col, Row, message } from 'antd';
import Button from 'antd-button-color';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Changepassword = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm();
    const mail = sessionStorage.getItem("passemail")
    const [load, setLoad] = useState(false);
    const [newpassword, setNewPassword] = useState('');

    const changepass = () => { form.validateFields().then((r) => { changepas(); }) }
    const changepas = async () => {
        setLoad(true);
        await axios({
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            url: "/api/log/changepassword",
            data: {
                Email_Id: mail,
                password: newpassword
            }
        }).then((r) => {
            debugger;
            message.success("Password changed Successfully");
            sessionStorage.removeItem("passemail")
            navigate('/');
        }).catch((error) => {
            debugger;
            message.error(error.response.data.error);
        })
        setLoad(false);
    }
    return (
        <div className='loginHead'>
            <Row>
                <Col span={10}>
                    <div>
                        <h1 style={{ fontSize: 70, color: "white", marginTop: "25%" }}>MMM</h1>
                        <h1 style={{ fontSize: 35, color: "white", marginTop: "-10%" }}>SOLUTIONS</h1>
                    </div>

                </Col>
                <Col span={14}>
                    <h1 style={{ color: "white", marginTop: 30 }}><b>CHANGE PASSWORD</b></h1>
                    <Form className='registerContent' form={form} layout="vertical" name="form_in_modal">
                        <Row style={{ marginTop: 50 }}>
                            <Col span={4} className='content1'>

                                <h3 style={{ fontWeight: "bold" }}>New Password</h3><br />

                                <h3 style={{ fontWeight: "bold" }}>Confirm New Password</h3>

                            </Col>

                            <Col span={5} className='content2'>

                                <Form.Item name="newpassword" rules={[{ required: true, message: 'Please enter the Password' }, {
                                    pattern: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/),
                                    message: "8 to 24 characters.Must begin with a Letters, numbers, underscores, hyphens allowed."
                                }]}>
                                    <Input.Password type='text' id='newpassword' value={newpassword} placeholder="Enter Password" style={{ width: 250 }}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item name="confirmPassword" dependencies={["newpassword"]}
                                    hasFeedback
                                    rules={[{ required: true, message: 'Please confirm the password' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("newpassword") === value)
                                                return Promise.resolve();

                                            return Promise.reject(
                                                new Error("The two passwords that you entered do not match!")
                                            );
                                        },
                                    })
                                    ]}>
                                    <Input.Password type='text' placeholder='Confirm Password' style={{ width: 250 }} />
                                </Form.Item>
                                <Button type='primary' onClick={changepass} loading={load} style={{ marginLeft: 10 }}>Change Password</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Changepassword;