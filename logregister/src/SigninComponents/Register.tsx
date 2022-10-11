import { Row, Col, Input, Form, Radio, message, DatePicker } from 'antd';
import Button from 'antd-button-color';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './Register.css';

const Register: React.FC = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm();
    const emails = sessionStorage.getItem('email')

    const [Firstname, setFirstname] = useState('');
    const [Employeecode, setEmployeecode] = useState('');
    const [ContactNo, setContactNo] = useState('');
    const [password, setpassword] = useState('');
    const [Lastname, setLastname] = useState('');
    const [Joiningdate, setJoiningdate] = useState('');


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
                Firstname, Lastname, Employeecode, Reportingmanager: "null", Employeetype_Id: 1,
                Role_Id: 1, Designation_Id: 1, Isactive: true, Joiningdate,
                Email_Id: emails, ContactNo, password
            }
        }).then((r) => {
            message.success(Firstname + Lastname + " Registered Successful")
            form.resetFields();
            navigate('/');
        }).catch((error) => {
            message.error(error.response.data.error);
        })
    }
    const [startvalue, setStartvalue] = useState('');
    const handleStartDate = (event: any) => {
        setStartvalue(event);
        const v = moment(new Date(event)).format('YYYY/MM/DD');
        setJoiningdate(v);
    }
    return (
        <div className='loginHead'>
            <Row>
                <Col span={6}>
                    <div>
                        <h1 style={{ fontSize: 70, color: "white", marginTop: "50%" }}>MMM</h1>
                        <h1 style={{ fontSize: 35, color: "white", marginTop: "-20%" }}>SOLUTIONS</h1>
                    </div>
                </Col>
                <Col span={18}>
                    <h1 style={{ color: "white", marginTop: 30 }}><b>REGISTER</b></h1>
                    <Form className='registerContent' form={form} layout="vertical" name="form_in_modal">
                        <Row>
                            <Col span={4} className='content1'>

                                <h3 style={{ fontWeight: "bold" }}>Email ID</h3><br />

                                <h3 style={{ fontWeight: "bold" }}>First Name</h3><br />

                                <h3 style={{ fontWeight: "bold" }}>Employee Code</h3><br />

                                <h3 style={{ fontWeight: "bold" }}>Password</h3>

                            </Col>

                            <Col span={4} className='content2'>

                                {/* @ts-ignore */}
                                <Input type='text' value={emails} readOnly
                                />

                                <Form.Item style={{ marginTop: "10%" }} name="Firstname" rules={[{ required: true, message: 'Please enter the Name' }, {
                                    pattern: new RegExp(/^[a-z A-Z]+$/i),
                                    message: "It does not accept numbers and special characters"
                                }]}>
                                    <Input type='text' id='Firstname' value={Firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                    />
                                </Form.Item>

                                <Form.Item style={{ marginTop: "10%" }} name="Employeecode" rules={[{ required: true, message: 'Please enter the EmployeeCode' }, {
                                    pattern: new RegExp(/^[a-z A-Z0-9]+$/i),
                                    message: "It does not accept special characters"
                                }]}>
                                    <Input type='text' id='Employeecode' value={Employeecode}
                                        onChange={(e) => setEmployeecode(e.target.value)}
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

                            </Col>

                            <Col span={4} className='content3'>

                                <h3 style={{ fontWeight: "bold" }}>Contact No</h3><br />

                                <h3 style={{ fontWeight: "bold" }}>Last Name</h3><br />

                                <h3 style={{ fontWeight: "bold" }}>Joining Date</h3><br />

                                <h3 style={{ fontWeight: "bold" }}>Confirm Password</h3>

                            </Col>

                            <Col span={4} className='content2'>

                                <Form.Item name="ContactNo" rules={[{ required: true, message: 'Please enter the ContactNo' }, {
                                    pattern: new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
                                    message: "Enter Valid Phone Number"
                                }]}>
                                    <Input type="text" id='ContactNo' value={ContactNo}
                                        onChange={(e) => setContactNo(e.target.value)}
                                    />
                                </Form.Item>

                                <Form.Item style={{ marginTop: "7%" }} name="Lastname" rules={[{ required: true, message: 'Please enter the Name' }, {
                                    pattern: new RegExp(/^[a-z A-Z]+$/i),
                                    message: "It does not accept numbers and special characters"
                                }]}>
                                    <Input type='text' id='Lastname' value={Lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                    />
                                </Form.Item>

                                <Form.Item name="Joiningdate" rules={[{ required: true, message: 'Please enter the Name' }]} >
                                    {/* @ts-ignore */}
                                    <DatePicker style={{ width: "100%" }} value={startvalue}
                                        disabledDate={(current) => {
                                            let customDate = new Date;
                                            return current && current > moment(customDate, "YYYY - MM - DD");
                                        }}
                                        onChange={handleStartDate}
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
                            </Col>
                            <Col span={2}></Col>

                        </Row>
                        <Button type="danger" style={{ marginLeft: "-20%" }} onClick={oncancel}>Cancel</Button>
                        <Button type='primary' style={{ marginLeft: 10 }} onClick={senddata}>Register</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Register;