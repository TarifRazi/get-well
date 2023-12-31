import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useAxiosPrivet from "../../Hooks/useAxiosPrivet";
import useDoctors from "../../Hooks/useDoctors";
import SectionTitle from "../../cmponents/SectionTitle";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const ManageDoctors = () => {

    const [doctors, refetch] = useDoctors()

    const axiosSecure = useAxiosPrivet();

    const handleDeleteDoctor = (doctor) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/doctors/${doctor._id}`);
                // console.log(res.data);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${doctor.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }


            }
        });
    }


    return (
        <div>
            <div>
                <SectionTitle subHeading="manage" heading="doctors"></SectionTitle>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                   
                                </th>
                                <th>Name</th>
                                <th>Specialization</th>
                                <th>Favorite Color</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                doctors.map((doctor, index)=><tr key={doctor._id} className="hover">
                                <th>
                                   {index+1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={doctor.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{doctor.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <h2>{doctor.specialization}</h2>
                                </td>
                                <td>
                                    <Link to={`/dashboard/updateDoctor/${doctor._id}`}>
                                    <button><FaEdit></FaEdit></button>
                                    </Link>
                                </td>
                                <th>
                                    <button onClick={() => handleDeleteDoctor(doctor)} className="btn btn-ghost btn-xs"><FaTrashAlt></FaTrashAlt></button>
                                </th>
                            </tr>)
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageDoctors;