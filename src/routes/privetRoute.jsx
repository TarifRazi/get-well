import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";


const PrivetRoute = ({children}) => {

    const {user,loading} = useContext(AuthContext)
    const location = useLocation();

    if (loading) {
        return <ClimbingBoxLoader color="#36d7b7" />
    }

    if (user) {
        return children
    }

    return <Navigate to={'/login'} state={{from:location}} replace></Navigate>
};

export default PrivetRoute;