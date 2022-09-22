import { Card, Input, Select, Space, Table } from "antd"
import Button from "antd-button-color";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";

const Getemployee = () => {

    const { Option } = Select;
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const column = [
        {
            title: 'COL_ID',
            render: (value: any, item: any, index: any) => (page - 1) * pageSize + index + 1,
            dataIndex: 'colid',
            width: "10rem"
        },
        {
            title: "USRENAME",
            render: (record: any) => (
                <span>{record.Firstname} {record.Lastname}</span>
            )
        },
        {
            title: "Designation",
            dataIndex: "Designation_Id"
        },
        {
            title: "Type",
            dataIndex: "Employeetype_Id"
        },
        {
            title: "Email ID",
            dataIndex: "Email_Id",
        },
        {
            title: "Contact No",
            dataIndex: "ContactNo",
        },
        {
            title: "Reporting Manager",
            dataIndex: "Reportingmanager"
        },
        {
            title: "Joining Date",
            dataIndex: "Joiningdate",
            render: (Joiningdate: any) => { return (<p>{moment(Joiningdate).format("DD-MM-YYYY")}</p>) }
        },
        {
            title: "End Date",
            dataIndex: "Enddate"
        }
    ];

    const [employeeData, setEmployeeData] = useState('');
    const [filterdEmployee, setFilteredEmployee] = useState('');

    const clientdtl = async () => {
        const response = await axios("/api/log/user", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        setEmployeeData(response.data);
        const abc = response.status;
    }
    useEffect(() => {
        clientdtl();
    }, []);

    return (
        <div>
            <Card >
                <Space style={{ marginRight: "50%", marginBottom: "1.5%" }}>
                    <b style={{ marginTop: "5%" }}>Search</b>
                    <Input type="text" />
                    <b style={{ marginTop: "5%" }}>Active</b>
                    <Select defaultValue={0}>
                        <Option value={0}>Yes</Option>
                        <Option value={1}>No</Option>
                    </Select>
                    <Button type="primary">ADD EMPLOYEE</Button>
                    <Button type="danger">DEACTIVATE</Button>
                    <Button style={{ backgroundColor: "#17a2b8", color: "white" }}>EDIT</Button>
                </Space>
                <Table
                    columns={column}//@ts-ignore
                    dataSource={employeeData}
                    pagination={{
                        current: page,
                        pageSize: pageSize,
                        onChange: (page, pageSize) => {
                            setPage(page);
                            setPageSize(pageSize)
                        }
                    }}
                    scroll={{
                        y: 350
                    }}
                    size="middle"
                />
            </Card>
        </div>
    )
}


export default Getemployee;