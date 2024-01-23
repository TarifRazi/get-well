import { ClimbingBoxLoader } from "react-spinners";
import useAuth from "../Hooks/useAuth";
import useUser from "../Hooks/useUser";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const { loading, user } = useAuth();
  const [userData] = useUser();
  console.log(user)
  return (
    <div className="">
      <div>
        {/* <img src={user.photoURL} alt="" /> */}
      </div>

      <div className="hero w-full min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse justify-between w-full gap-8">
          {loading ? (<div>
            <div className="skeleton w-32 h-32"></div>
          </div>) : (
            <div>
              <img className="max-w-sm rounded-lg shadow-2xl" src={user.photoURL} alt="profile photo" />
            </div>
          )}

          <div>
            {userData && userData[0] && userData[0].email ? (
              <div>
                <h1 className="text-5xl font-bold">{userData[0].name}</h1>
                <h1 className="text-3xl font-bold">{userData[0].email}</h1>
                <p className="py-6">{userData[0]?.bloodGroup || "Add your bloodGroup"}</p>
                <p className="py-6">{userData[0]?.District || "Add your district"}</p>
                <p className="py-6">{userData[0]?.upazila || "Add your upazila"}</p>
              </div>
            ) : (
              <div>No email available</div>
            )}

            <Link to={`/updateMyProfile/${user?.email}`}>
              <button className="btn btn-primary">Update</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
