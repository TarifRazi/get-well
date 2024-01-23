import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPrivet from "../Hooks/useAxiosPrivet";
import useUser from "../Hooks/useUser";
import useAuth from "../Hooks/useAuth";


const Register = () => {

    const axiosSecure = useAxiosPrivet();
    const [userData] = useUser()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { loading, user } = useAuth();
    const navigate = useNavigate()

    console.log(userData)

    const onSubmit = data => {
        console.log(data)
        const userInfo = {
            name: data.name,
            age: data.age,
            bloodGroup: data.bloodGroup,
            district: data.district,
            upazila: data.upazila
        }
        axiosSecure.patch(`/users/${user?.email}`, userInfo)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    console.log('user update to database')
                    reset();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'User Updated successfully.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/myProfile/:email')
                }
            })
    }

    return (
        <div>
            <div className="hero bg-base-200 py-9">
                <div className="hero-content w-full flex-col  lg:gap-10">
                    <div className="text-center ">
                        {loading ? (<div className="skeleton w-32 h-32"></div>) : (
                            <div className="w-full ">
                                <img className="w-auto rounded-lg shadow-2xl" src={user.photoURL} alt="profile photo" />
                                <h1 className="border-2 rounded-lg p-3 mt-3">{user.email}</h1>
                            </div>
                        )}
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        {userData && userData[0] && userData[0].email ? (
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input defaultValue={userData[0]?.name} name="name"  {...register("name", { required: true })} type="text" placeholder="Your name" className="input input-bordered" required />
                                    {errors.name && <span>This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Age</span>
                                    </label>
                                    <input defaultValue={userData[0]?.age} name="age" type="number"  {...register("age")} placeholder="Age" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Blood group</span>
                                    </label>
                                    {/* <input name="age" type="number"  {...register("age")} placeholder="Age" className="input input-bordered" required /> */}
                                    <select defaultValue={userData[0]?.bloodGroup} name="bloodGroup" {...register("bloodGroup")} className="select select-bordered w-full ">
                                        <option disabled selected>Select your blood group</option>
                                        <option>A+</option>
                                        <option>A-</option>
                                        <option>B+</option>
                                        <option>B-</option>
                                        <option>O+</option>
                                        <option>O-</option>
                                        <option>AB+</option>
                                        <option>AB-</option>
                                    </select>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">District</span>
                                    </label>
                                    {/* <input name="age" type="number"  {...register("age")} placeholder="Age" className="input input-bordered" required /> */}
                                    <select defaultValue={userData[0].district} name="district" {...register("district")} className="select select-bordered w-full ">
                                        <option disabled selected>Select your blood group</option>
                                        <option>Dhaka</option>
                                        <option>Brahmanbaria</option>
                                        <option>Cumilla</option>
                                        <option>Chandpur</option>
                                        <option>Habiganj</option>
                                    </select>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Upazila</span>
                                    </label>
                                    {/* <input name="age" type="number"  {...register("age")} placeholder="Age" className="input input-bordered" required /> */}
                                    <select defaultValue={userData[0].upazila} name="upazila" {...register("upazila")} className="select select-bordered w-full ">
                                        <option disabled selected>Select your blood group</option>
                                        <option>Savar</option>
                                        <option>Kasba</option>
                                        <option>Bansarampur</option>
                                        <option>Motlab</option>
                                        <option>Keraniganj</option>
                                        <option>Gazipur</option>
                                        <option>Akhaora</option>
                                        <option>B.Shador</option>
                                    </select>
                                </div>
                                <div className="form-control mt-6">
                                    <input className="btn btn-primary" type="submit" value="Update my profile" />
                                </div>

                            </form>
                        ) : (
                            <div><h1>loading</h1></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;