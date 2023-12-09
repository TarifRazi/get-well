import Swal from "sweetalert2";
import useAppointments from "../../Hooks/useAppointments";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const MyAppointments = () => {

    const [appointment,refetch] = useAppointments()
    const axiosSecure = useAxiosSecure()
    const totalFees = appointment.reduce((total, appointmentDoctor) => {
        const feeAsNumber =
            typeof appointmentDoctor.visit_fee === "string"
                ? parseFloat(appointmentDoctor.visit_fee.split("$").join(""))
                : appointmentDoctor.visit_fee;


        // Add the fee to the total
        return total + feeAsNumber;
    }, 0)

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {


                axiosSecure.delete(`/appointment/${id}`)
                    .then(res => {
                        refetch()
                        if (res.data.deletedCount > 0) {
                              Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                              });
                        }
                    })
            }
        });
    }

    return (
        <>
            <div className="flex justify-between">
                <h1>All appointments: {appointment.length}</h1>
                <h1>Total fees: {totalFees}$</h1>
                <button className="btn btn-ghost">Pay</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>specialization</th>
                            <th>Doctors Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            appointment.map((appointmentDoctors, index) => <tr className="hover" key={appointmentDoctors._id}>
                                <th>{index + 1}</th>
                                <td>{appointmentDoctors.specialization}</td>
                                <td>{appointmentDoctors.name}</td>
                                <td><button 
                                onClick={() => handleDelete(appointmentDoctors._id)}
                                className="btn btn-error"> X </button></td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </>
    );
};

export default MyAppointments;