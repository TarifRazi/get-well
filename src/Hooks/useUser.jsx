import { useQuery } from "@tanstack/react-query";
import useAxiosPrivet from "./useAxiosPrivet";
import useAuth from "./useAuth";

const useUser = () => {
  const axiosSecure = useAxiosPrivet();
  const { user } = useAuth();
  console.log({ user }); // Check if user is defined and has the expected properties
  const { refetch, data: userData = [] } = useQuery({
    queryKey: ['users', user?.email],
    queryFn: async () => {
      console.log(user.email); // Log the email to verify it's correct
      try {
        const res = await axiosSecure.get(`/users/${user.email}`);
        console.log(res.data); // Log the fetched data
        return res.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
      }
    },
  });
  return [userData, refetch];
};

export default useUser;
