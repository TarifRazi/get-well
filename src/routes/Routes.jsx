import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import MyAppointments from "../pages/myAppoinment/MyAppointments";
import TestResult from "../pages/testResult/TestResult";
import Login from "../pages/login/Login";
import PrivetRoute from "./privetRoute";
import Register from "../pages/registration/Register";
import TestDetails from "../cmponents/TestDetails";
import DashBoard from "../layout/DashBoard";
import Admin from "../pages/dashboard/Admin";
import AllUsers from "../pages/dashboard/AllUsers";
import AddServices from "../pages/dashboard/AddServices";
import AdminRoute from "./AdminRoute";
import AddDoctor from "../pages/dashboard/AddDoctor";
import ManageServices from "../pages/dashboard/ManageServices";
import UpdateService from "../pages/dashboard/UpdateService";
import MyProfile from "../pages/MyProfile";
import ManageDoctors from "../pages/dashboard/ManageDoctors";
import UpdateDoctor from "../pages/dashboard/UpdateDoctor";
import UpdateMyProfile from "../pages/UpdateMyProfile";

export const routers = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/myProfile/:email',
                element: <PrivetRoute><MyProfile></MyProfile></PrivetRoute>
            },
            {
                path: '/updateMyProfile/:email',
                element: <PrivetRoute><UpdateMyProfile></UpdateMyProfile></PrivetRoute>
            },
            {
                path: '/testDetails/:id',
                element: <PrivetRoute><TestDetails></TestDetails></PrivetRoute>,
                loader: ({ params }) => fetch(`https://get-well-server.vercel.app/services/${params.id}`)
            },
        ]
    },
    {
        path: 'dashboard',
        element: <PrivetRoute><DashBoard></DashBoard></PrivetRoute>,
        children: [
            {
                path: 'adminPage',
                element: <AdminRoute><Admin></Admin></AdminRoute>
            },
            {
                path: 'addServices',
                element: <AdminRoute><AddServices></AddServices></AdminRoute>
            },
            {
                path: 'allUsers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'addDoctor',
                element: <AdminRoute><AddDoctor></AddDoctor></AdminRoute>
            },
            {
                path: 'manageServices',
                element: <AdminRoute><ManageServices></ManageServices></AdminRoute>
            },
            {
                path: 'manageDoctors',
                element: <AdminRoute><ManageDoctors></ManageDoctors></AdminRoute>
            },
            {
                path: 'updateService/:id',
                element: <AdminRoute><UpdateService></UpdateService></AdminRoute>,
                loader: ({ params }) => fetch(`https://get-well-server.vercel.app/services/${params.id}`)
            },
            {
                path: 'updateDoctor/:id',
                element: <AdminRoute><UpdateDoctor></UpdateDoctor></AdminRoute>,
                loader: ({ params }) => fetch(`https://get-well-server.vercel.app/doctors/${params.id}`)
            },

            // normal users
            {
                path: 'appointments',
                element: <PrivetRoute><MyAppointments></MyAppointments></PrivetRoute>
            },
            {
                path: 'testResult',
                element: <PrivetRoute><TestResult></TestResult></PrivetRoute>
            }

        ]
    }
])