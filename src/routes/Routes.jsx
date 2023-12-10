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
                path: '/testDetails/:id',
                element: <PrivetRoute><TestDetails></TestDetails></PrivetRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/services/${params.id}`)
            },
        ]
    },
    {
        path:'dashboard',
        element:<PrivetRoute><DashBoard></DashBoard></PrivetRoute>,
        children:[
            {
                path:'adminPage',
                element:<Admin></Admin>
            },
            {
                path: 'appointments',
                element: <PrivetRoute><MyAppointments></MyAppointments></PrivetRoute>
            },
            {
                path: 'testResult',
                element: <PrivetRoute><TestResult></TestResult></PrivetRoute>
            },
            {
                path:'allUsers',
                element:<AllUsers></AllUsers>
            }
        ]
    }
])