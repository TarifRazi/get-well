import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosPrivet from "../Hooks/useAxiosPrivet";
import useBookTest from "../Hooks/useBookTest";


const TestDetails = () => {

    const service = useLoaderData();
    const { title, description, cost, image, discount, slots, _id } = service || {};
    const navigate = useNavigate();
    const {user} = useAuth();
    const axiosSecure = useAxiosPrivet();
    const [,refetch] = useBookTest()




    const handleBookTest = () => {
        // console.log('hlw', user.email)
        if (user && user.email) {
            const bookedTests = {
                doctorId: _id,
                email: user.email,
                title,
                image,
                cost
            }
            axiosSecure.post('/tests', bookedTests)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${title} added to your cart`,
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
        <div>
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure><img src={image} alt="Album" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <p>{description}</p>
                    {/* <p>{slots}</p> */}
                    <p>
                        <div>
                            <h2>Schedule:</h2>
                            <ul>
                                {slots.map((slot) => (
                                    <li key={slot.time}>
                                        <strong>{slot.time}:</strong> {slot.status}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </p>
                    <h2 className="text-red-500 text-lg font-bold">Cost: {cost}$</h2>
                    <h2 className="text-green-500">Discount: {discount}%</h2>
                    <div className="card-actions justify-end">
                        <button onClick={handleBookTest} className="btn btn-primary">Book</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestDetails;