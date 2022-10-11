import { Card, Input, message, Modal, Select, Space, Spin, Table } from "antd"
import { Checkbox } from 'semantic-ui-react';
import Button from "antd-button-color";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";

const Getemployee = () => {

    const { Option } = Select;
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");
    const [loading, setLoading] = useState(true);
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
            // render: (Joiningdate: any) => { return (<p>{moment(Joiningdate).format("DD-MM-YYYY")}</p>) }
        },
        {
            title: "End Date",
            dataIndex: "Enddate",
            // render: (date: any) => { return (<p>{moment(date).format("DD-MM-YYYY")}</p>) }
        }
    ];

    const [employeeData, setEmployeeData] = useState('');
    const [filterdEmployeedata, setFilteredEmployeeData] = useState('');
    const [search, setSearch] = useState('');
    try {
        const clientdtl = async () => {
            const response = await axios("/api/log/user", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setEmployeeData(response.data);
            setFilteredEmployeeData(response.data);
            setLoading(false);
        }
        useEffect(() => {
            clientdtl();
        }, []);
    } catch (error) {
        setLoading(false);
        message.error("server error");
    }

    const [selectedRows, setSelectedRows] = useState([]);
    const hasSelected = selectedRows.length > 0;
    const hassSelected = selectedRows.length > 0 && selectedRows.length == 1;
    const val = selectedRows[0];
    console.log(val);
    const rowSelection = {
        onChange: (selectedRowKeys: any, selectedRow: any) => {
            setSelectedRows(selectedRow);
        }
    };

    // useEffect(() => {
    //     const result = employeeData.filter(empdata => {
    //         return empdata.Firstname.toString().toLowerCase().match(search.toLowerCase())
    //     })
    //     setFilteredEmployeeData(result)
    // }, [search])

    return (
        <Spin spinning={loading} delay={500}>
            <Card >
                <Space style={{ marginRight: "50%", marginBottom: "1.5%" }}>
                    <b style={{ marginTop: "5%" }}>Search</b>
                    <Input type="text" value={search} suffix={<SearchOutlined />}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <b style={{ marginTop: "5%" }}>Active</b>
                    <Select defaultValue={0}>
                        <Option value={0}>Yes</Option>
                        <Option value={1}>No</Option>
                    </Select>
                    <Button type="primary"><Link to="/Home/addemployee">ADD EMPLOYEE</Link></Button>
                    <Button hidden={!hasSelected} type="danger">DEACTIVATE</Button>
                    <Button hidden={!hassSelected} style={{ backgroundColor: "#17a2b8", color: "white" }}><Link state={{ id: val }} to="/Home/editemployee">EDIT</Link></Button>
                </Space>
                <Table
                    columns={column}//@ts-ignore
                    dataSource={employeeData}
                    rowKey={record => record.Employee_Id}
                    rowSelection={{//@ts-ignore
                        type: Checkbox,
                        ...rowSelection,
                    }}
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
        </Spin>
    )
}


export default Getemployee;