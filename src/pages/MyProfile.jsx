import { useLoaderData } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const MyProfile = () => {

    const { user } = useAuth()
    const { userData } = useLoaderData()

    console.log(userData)

    return (
        <div className="">
            <div className="m-10">
                {user ? (
                    <div className="flex mx-36 justify-center gap-6 items-center">
                        <div>
                            <img src={user.photoURL} className="w-[300px]" />
                        </div>
                        <div>
                            <h1 className="font-bold my-7">Welcome, <span className="text-2xl">{user.displayName || user.email}</span> !</h1>
                            {/* Display additional user information */}
                            <p>Email: {user.email}</p>
                        </div>

                        {/* Add more profile details as needed */}
                    </div>
                ) : (
                    <p>Please log in to view your profile.</p>
                )}
            </div>
        </div>
    );
};

export default MyProfile;