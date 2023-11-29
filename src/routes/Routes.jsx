import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import MyAppointments from "../pages/myAppoinment/MyAppointments";
import TestResult from "../pages/testResult/TestResult";
import Login from "../pages/login/Login";
import PrivetRoute from "./privetRoute";
import Register from "../pages/registration/Register";

export const routers = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element: <Home></Home>
            },
            {
                path:'/appointments',
                element: <PrivetRoute><MyAppointments></MyAppointments></PrivetRoute>
            },
            {
                path:'/testResult',
                element:<PrivetRoute><TestResult></TestResult></PrivetRoute>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
        ]
    }
])