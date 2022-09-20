import { Card, Table } from "antd"
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Getemployee = () => {

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
            dataIndex: "Username",
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
            dataIndex: "Joiningdate"
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
        <div className="loginHead">
            <Card >
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