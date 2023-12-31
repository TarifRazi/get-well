

import { useQuery } from "@tanstack/react-query";
import useAxiosPrivet from "./useAxiosPrivet";
import useAuth from "./useAuth";

const useAppointments = () => {
    const axiosSecure = useAxiosPrivet();
    const { user } = useAuth();
    const { refetch, data: appointment = [] } = useQuery({
        queryKey: ['appointment', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/appointment?email=${user.email}`);
            return res.data;
        },
    });
    return [appointment, refetch];
};

export default useAppointments;
