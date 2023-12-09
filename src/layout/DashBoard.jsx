import { NavLink, Outlet } from "react-router-dom";


const DashBoard = () => {
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-black">
                <ul className="menu">
                    <li><NavLink to={'/'}>Home</NavLink></li>
                    <li><NavLink to={'/dashboard/appointments'}>My Appointment</NavLink></li>
                    <li><NavLink to={'/dashboard/testResult'}>Test Result</NavLink></li>
                    <div className="divider"></div> 
                    <li><NavLink to={'/dashboard/adminPage'}>Admin</NavLink></li>
                    <li><NavLink to={'/dashboard/addServices'}>Add Services</NavLink></li>
                    <li><NavLink to={'/dashboard/addDoctor'}>Add Doctor</NavLink></li>
                    <li><NavLink to={'/dashboard/allUsers'}>All Users</NavLink></li>
                </ul>
            </div>
            <div className="flex-1 p-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;