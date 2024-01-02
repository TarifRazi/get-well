import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: `https://get-well-server.vercel.app`
});

const useAxiosPrivet = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use((response) => {
        return response;
    },async (error) => {
        const status = error.response.status;

        if (status === 401 || status === 403) {
            // logOut().then(() => {
            //     navigate('/login');
            // });
            await logOut();
            navigate('/login')
        }

        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosPrivet;
