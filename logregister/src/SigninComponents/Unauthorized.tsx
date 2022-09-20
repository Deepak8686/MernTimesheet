import { useLocation, Navigate } from "react-router-dom";

const Unauthorized = () => {
    const location = useLocation();
    return <Navigate to="/" state={{ from: location }} replace />;
};

export default Unauthorized;
