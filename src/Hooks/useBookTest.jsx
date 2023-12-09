import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useBookTest = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()

    const { refetch, data: tests = [] } = useQuery({
        queryKey: ['tests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tests?email=${user.email}`);
            return res.data
        }
    })
    return [tests, refetch]
};

export default useBookTest;