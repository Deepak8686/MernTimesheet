import { Layout } from 'antd';
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useAuthContext } from './context/Auth/State';
import Changepassword from './SigninComponents/ChangePassword';
import Login from './SigninComponents/Login';
import Mailregister from './SigninComponents/Mailregist';
import Passwordmailverify from './SigninComponents/PasswordMailVerify';
import Register from './SigninComponents/Register';
import Homes from './UserComponents/Homes';
import Unauthorized from './SigninComponents/Unauthorized';

const { Content } = Layout;
const Homei: React.FC = () => {

    const { isAuthrozied } = useAuthContext();

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Mailregister />} />
                <Route path='/registeration' element={<Register />} />
                <Route path='/passwordmailverify' element={<Passwordmailverify />} />
                <Route path='/changepassword' element={<Changepassword />} />
                <Route path='/Home/*' element={isAuthrozied ? <Homes /> : <Unauthorized />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Homei;