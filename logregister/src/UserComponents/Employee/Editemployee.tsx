import { Col, Input, Modal, Row } from "antd"
import Button from "antd-button-color";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


const Editemployee = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [isVisible, setIsvisible] = useState(true);
    const val = location.state;


    const cancel = () => {
        setIsvisible(false);
        navigate('/Home/employees')
    }

    return (
        <Modal open={isVisible} closable={false} footer={false} width={1000}>
            <Row><h1>EDIT</h1></Row>
            <Row>
                <Col span={4}>
                    <h3>Employee Id</h3>
                    <Input type="text" disabled />
                </Col><Col span={1}></Col>
                <Col span={4}>
                    <h3>First Name</h3>
                    <Input type="text" />
                </Col><Col span={1}></Col>
                <Col span={4}>
                    <h3>Last Name</h3>
                    <Input type="text" />
                </Col><Col span={1}></Col>
                <Col span={4}>
                    <h3>Employee Code</h3>
                    <Input type="text" />
                </Col><Col span={1}></Col>
                <Col span={4}>
                    <h3>Reporting Manager</h3>
                    <Input type="text" />
                </Col>
            </Row><br />

            <Row>
                <Col span={4}>
                    <h3>Joining Date</h3>
                    <Input type="text" />
                </Col><Col span={1}></Col>
                <Col span={4}>
                    <h3>End Date</h3>
                    <Input type="text" />
                </Col><Col span={1}></Col>
                <Col span={4}>
                    <h3>Employee Type</h3>
                    <Input type="text" />
                </Col><Col span={1}></Col>
                <Col span={4}>
                    <h3>Designation</h3>
                    <Input type="text" />
                </Col>
            </Row><br />
            <Row><h2>CONTACT DETAILS</h2></Row>
            <Row>
                <Col span={4}>
                    <h3>Official E-mail Id</h3>
                    <Input type="text" />
                </Col><Col span={1}></Col>
                <Col span={4}>
                    <h3>Alternate E-mail Id</h3>
                    <Input type="text" />
                </Col><Col span={1}></Col>
                <Col span={4}>
                    <h3>Contact No</h3>
                    <Input type="text" />
                </Col>
            </Row><br />
            <Row style={{ marginLeft: "70%" }}>
                <Button type="danger" onClick={cancel}>Cancel</Button>
                <Button type="success" style={{ backgroundColor: "#28a745", color: "white", marginLeft: 10 }} >EDIT EMPLOYEE</Button>
            </Row>
        </Modal>
    )
}

export default Editemployee;