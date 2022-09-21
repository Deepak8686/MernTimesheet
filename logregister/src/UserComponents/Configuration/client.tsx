import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Client: React.FC = () => {

    const [ClientDataSoure, setClientDataSoure] = useState();
    const [FilteredClient, setFilteredClient] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        clientdtl();
    }, []);


    const clientdtl = async () => {
        const response = await axios("/GetClient/getclientrouter", {

        })
        setClientDataSoure(response.data);
        debugger;
        setFilteredClient(response.data);
    };


    const columns = [
        {
            title: 'Client',
            dataIndex: 'Client_Name',
        },
    ];


    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };


    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };


    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;


    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                    Reload
                </Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={FilteredClient} />
        </div>
    );
};
export default Client;