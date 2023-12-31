import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivet from "../Hooks/useAxiosPrivet";
import useAppointments from "../Hooks/useAppointments";


const DoctorCard = ({ doctors }) => {

    const { name, specialization, visit_fee, image, schedule, qualification, details, _id } = doctors || {};
    const { user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const axiosSecure = useAxiosPrivet()
    const [, refetch] = useAppointments()

    const handleAddAppointment = () => {
        // console.log('hlw', user.email)
        if (user && user.email) {
            const appointmentDoctor = {
                doctorId: _id,
                email: user.email,
                name,
                specialization,
                schedule,
                visit_fee
            }
            axiosSecure.post('/appointment', appointmentDoctor)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} added to your cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // refetch cart to update the cart items count
                        refetch();
                    }

                })
        }
        else {
            Swal.fire({
                title: "You are not Logged In?",
                text: "Please login to add Appointment?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }


    return (
        <div className="">
            <div className="card lg:card-side bg-base-100 shadow-xl m-8">
                <figure className="w-1/2"><img className="w-[550px] h-full" src={image} alt="Album" /></figure>
                <div className="card-body text-left">
                    <h2 className="card-title">{name}</h2>
                    <h2 className="card-title">{specialization}</h2>
                    <h2 className="card-title">{qualification}</h2>
                    <p>{details}</p>
                    <div>
                        <h2>Schedule:</h2>
                        <ul>
                            {schedule.map((schedule) => (
                                <li key={schedule.time}>
                                    <strong>{schedule.day}:</strong> {schedule.time}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <h2>{visit_fee}</h2>
                    <div className="card-actions justify-end">
                        <button onClick={handleAddAppointment} className="btn btn-primary">Add appointment</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;