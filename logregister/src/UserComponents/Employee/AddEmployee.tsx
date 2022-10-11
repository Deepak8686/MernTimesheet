import { Col, DatePicker, Form, Input, message, Modal, Row } from "antd"
import Button from "antd-button-color";
import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Addemployee = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isVisible, setIsvisible] = useState(true);

    const cancel = () => {
        setIsvisible(false);
        form.resetFields();
        navigate('/Home/employees');
    }

    const [startvalue, setStartvalue] = useState('');
    const [endvalue, setEndvalue] = useState('');

    const handleStartDate = (event: any) => {
        setStartvalue(event);
        const v = moment(new Date(event)).format('YYYY/MM/DD');
        setJoiningdate(v);
    }
    const handleEnddate = (event: any) => {
        setEndvalue(event);
        const d = moment(new Date(event)).format('YYYY/MM/DD');
        setEnddate(d);
    }

    const [Firstname, setFirstname] = useState('');
    const [Lastname, setLastname] = useState('');
    const [Employeecode, setEmployeecode] = useState('');
    const [Reportingmanager, setReportingmanager] = useState('');
    const [Employeetype_Id, setEmployeetype_Id] = useState('');
    const [Designation_Id, setDesignation_Id] = useState('');
    const [Joiningdate, setJoiningdate] = useState('');
    const [Enddate, setEnddate] = useState('');
    const [Email_Id, setEmail_Id] = useState('');
    const [AlternateEmail, setAlternateEmail] = useState('');
    const [ContactNo, setContactNo] = useState('');

    const addEmp = () => { form.validateFields().then(addEmps) }

    const addEmps = async () => {
        await axios({
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Authorization': `Bearer`
            },
            url: "/api/log/register",
            data: {
                Firstname, Lastname, Employeecode, Reportingmanager, Employeetype_Id,
                Role_Id: 2, Designation_Id, Isactive: true, Joiningdate, Enddate,
                Email_Id, AlternateEmail, ContactNo, password: "password"
            }
        }).then((r) => {
            message.success(Firstname + Lastname + " Added Successfully");
            form.resetFields();
            navigate('/Home/employees');
        }).catch((error) => {
            debugger;
            message.error(error.response.data.error);
        })
    }
    return (
        <Modal open={isVisible} closable={false} footer={false} width={1000}>
            <Form form={form} layout="vertical" name="form_in_modal">
                <Row><h1>ADD</h1></Row>
                <Row>
                    <Col span={4}>
                        <h3>Employee Id</h3>
                        <Input type="text" disabled />
                    </Col><Col span={1}></Col>
                    <Col span={4}>
                        <h3>First Name<span style={{ color: "red" }}>*</span></h3>
                        <Form.Item name="Firstname" rules={[{ required: true, message: "Enter your Firstname" }, {
                            pattern: new RegExp(/^[a-z A-Z]+$/i),
                            message: "It does not accept numbers and special characters"
                        }]}>
                            <Input type="text" value={Firstname} onChange={(e) => setFirstname(e.target.value)} />
                        </Form.Item>
                    </Col><Col span={1}></Col>
                    <Col span={4}>
                        <h3>Last Name<span style={{ color: "red" }}>*</span></h3>
                        <Form.Item name="Lastname" rules={[{ required: true, message: "Enter your Lastname" }, {
                            pattern: new RegExp(/^[a-z A-Z]+$/i),
                            message: "It does not accept numbers and special characters"
                        }]}>
                            <Input type="text" value={Lastname} onChange={(e) => setLastname(e.target.value)} />
                        </Form.Item>
                    </Col><Col span={1}></Col>
                    <Col span={4}>
                        <h3>Employee Code<span style={{ color: "red" }}>*</span></h3>
                        <Form.Item name="Employeecode" rules={[{ required: true, message: "Enter your Employeecode" }, {
                            pattern: new RegExp(/^[a-z A-Z0-9]+$/i),
                            message: "It does not accept special characters"
                        }]}>
                            <Input type="text" value={Employeecode} onChange={(e) => setEmployeecode(e.target.value)} />
                        </Form.Item>
                    </Col><Col span={1}></Col>
                    <Col span={4}>
                        <h3>Reporting Manager</h3>
                        <Input type="text" value={Reportingmanager} onChange={(e) => setReportingmanager(e.target.value)} />
                    </Col>
                </Row><br />

                <Row>
                    <Col span={4}>
                        <h3>Joining Date<span style={{ color: "red" }}>*</span></h3>
                        <Form.Item name="Joiningdate" rules={[{ required: true, message: "Select your Joining Date" }]}>
                            {/* @ts-ignore     */}
                            <DatePicker style={{ width: "100%" }} value={startvalue}
                                disabledDate={(current) => {
                                    let customDate = new Date;
                                    return current && current > moment(customDate, "YYYY - MM - DD");
                                }}
                                onChange={handleStartDate}
                            // onChange={(e) => setJoiningdate(e.target.value)}
                            />
                        </Form.Item>
                    </Col><Col span={1}></Col>
                    <Col span={4}>
                        <h3>End Date</h3>
                        {/* @ts-ignore */}
                        <DatePicker style={{ width: "100%" }} value={endvalue}
                            disabledDate={(Joiningdate) => {
                                let endd = new Date;
                                return Joiningdate && Joiningdate < moment(endd, "YYYY - MM - DD");
                            }}
                            onChange={handleEnddate}
                        />
                    </Col><Col span={1}></Col>
                    <Col span={4}>
                        <h3>Employee Type<span style={{ color: "red" }}>*</span></h3>
                        <Form.Item name="Employeetype_Id" rules={[{ required: true, message: "Select your Employee Type" }]}>
                            <Input type="text" value={Employeetype_Id} onChange={(e) => setEmployeetype_Id(e.target.value)} />
                        </Form.Item>
                    </Col><Col span={1}></Col>
                    <Col span={4}>
                        <h3>Designation<span style={{ color: "red" }}>*</span></h3>
                        <Form.Item name="Designation_Id" rules={[{ required: true, message: "Select your Designation" }]}>
                            <Input type="text" value={Designation_Id} onChange={(e) => setDesignation_Id(e.target.value)} />
                        </Form.Item>
                    </Col>
                </Row><br />
                <Row><h2>CONTACT DETAILS</h2></Row>
                <Row>
                    <Col span={4}>
                        <h3>Official E-mail Id<span style={{ color: "red" }}>*</span></h3>
                        <Form.Item name="Email_Id" hasFeedback rules={[{ required: true, message: 'Please enter the Email' }, {
                            pattern: new RegExp(/^([a-z0-9-_\.]+)@([a-z0-9]+)\.([a-z]{2,10})(\.[a-z]{2,8})?$/),
                            message: "Enter valid Email"
                        }]}>
                            <Input type="text" value={Email_Id} onChange={(e) => setEmail_Id(e.target.value)} />
                        </Form.Item>
                    </Col><Col span={1}></Col>
                    <Col span={4}>
                        <h3>Alternate E-mail Id</h3>
                        <Form.Item name="AlternateEmail" dependencies={["Email_Id"]}
                            hasFeedback
                            rules={[{
                                pattern: new RegExp(/^([a-z0-9-_\.]+)@([a-z0-9]+)\.([a-z]{2,10})(\.[a-z]{2,8})?$/),
                                message: "Enter valid Email"
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("Email_Id") != value)
                                        return Promise.resolve();
                                    return Promise.reject(
                                        new Error("Alternate E-mail and Official E-mail should not be same")
                                    );
                                },
                            })
                            ]}>
                            <Input type="text" value={AlternateEmail} onChange={(e) => setAlternateEmail(e.target.value)} />
                        </Form.Item>
                    </Col><Col span={1}></Col>
                    <Col span={4}>
                        <h3>Contact No<span style={{ color: "red" }}>*</span></h3>
                        <Form.Item name="ContactNo" hasFeedback rules={[{ required: true, message: 'Please enter the ContactNo' }, {
                            pattern: new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
                            message: "Enter Valid Phone Number"
                        }]}>
                            <Input type="text" value={ContactNo} onChange={(e) => setContactNo(e.target.value)} />
                        </Form.Item>
                    </Col>
                </Row><br />
                <Row style={{ marginLeft: "70%" }}>
                    <Button type="danger" onClick={cancel}>Cancel</Button>
                    <Button type="success" onClick={addEmp} style={{ backgroundColor: "#28a745", color: "white", marginLeft: 10 }} >ADD EMPLOYEE</Button>
                </Row>
            </Form>
        </Modal>
    )
}

export default Addemployee;