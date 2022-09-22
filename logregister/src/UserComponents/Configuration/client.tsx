import { Button, Card, Table, Modal, Form, Input, Space, message, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AudioOutlined, PlusCircleOutlined } from '@ant-design/icons';


const Client: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ClientDataSoure, setClientDataSoure] = useState();
    const [FilteredClient, setFilteredClient] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        await axios({
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            url: "/Addclient/addclientrouter",
            data: {
                Client_Name: ClientDataSoure
            }
        }).then((r) => axios("/GetClient/getclientrouter")
            .then((r) => {
                setIsModalOpen(false);
                setFilteredClient(r.data)
            }).catch((error) => {
                console.log(error.message)
            }))
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {
        clientdtl();
    }, []);


    const clientdtl = async () => {
        const response = await axios("/GetClient/getclientrouter")
        setFilteredClient(response.data);
    };

    const columns = [
        {
            title: 'Client',
            dataIndex: 'Client_Name',
        },
    ];

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const { Search } = Input;
    const { Option } = Select;
    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: '#1890ff',
            }}
        />
    );

    const onSearch = (value: string) => console.log(value);
    return (
        <Card style={{ margin: "20px 250px 550px 250px", padding: "0px 50px 0px 50px" }}>


            <h4 style={{ margin: "20px 800px 0px 0px", color: 'gray', fontSize: "30px" }}>Client</h4>
            <Space>
                <Search
                    placeholder="input search text"
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                />
                <h4 style={{ fontSize: "20px" }}>Active :</h4>
                <Input.Group compact>
                    <Select>
                        <Option value="Yes">Yes</Option>
                        <Option value="No">No</Option>
                    </Select>
                </Input.Group>
            </Space>
            <span style={{ marginLeft: 8 }}>
                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
            </span>

            <Table style={{ margin: "10px 10px 10px 10px" }} rowSelection={rowSelection} columns={columns} dataSource={FilteredClient} />

            <Button type='link' onClick={showModal}><PlusCircleOutlined />Add Client</Button>

            <Modal title="Add Client" footer={false} open={isModalOpen}>
                <Form onFinish={handleOk}>
                    <Form.Item label="Client">
                        <Input onChange={(e: any) => setClientDataSoure(e.target.value)} style={{ width: "200px" }} />
                    </Form.Item>

                    <Space>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button type='primary' htmlType='submit'>Add</Button>
                    </Space>
                </Form>
            </Modal>
        </Card>
    );
};
export default Client;