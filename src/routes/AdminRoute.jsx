import { ClimbingBoxLoader } from "react-spinners";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";


const AdminRoute = ({children}) => {

    const [user, loading] = [useAuth()]
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation();



    if (loading || isAdminLoading) {
        return <ClimbingBoxLoader color="#36d7b7" />
    }

    if (user && isAdmin) {
        return children
    }

    return <Navigate to={'/'} state={{from:location}} replace></Navigate>
};

export default AdminRoute;