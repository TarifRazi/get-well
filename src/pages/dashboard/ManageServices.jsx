import { FaEdit, FaTrash } from "react-icons/fa";
import useServices from "../../Hooks/useServices";
import SectionTitle from "../../cmponents/SectionTitle";
import useAxiosPrivet from "../../Hooks/useAxiosPrivet";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const ManageServices = () => {

    const [services, refetch] = useServices()

    const axiosSecure = useAxiosPrivet();

    const handleDeleteService = (service) => {
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
                const res = await axiosSecure.delete(`/services/${service._id}`);
                // console.log(res.data);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${service.name} has been deleted`,
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
                <SectionTitle subHeading="manage" heading="services"></SectionTitle>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Service name</th>
                                <th>Update</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                services.map((service, index) => <tr key={service._id} className="hover">
                                    <th>{index + 1}</th>
                                    <td>{service.title}</td>
                                    <td>
                                        <Link to={`/dashboard/updateService/${service._id}`}>
                                            <button>
                                                <FaEdit></FaEdit>
                                            </button>
                                        </Link>
                                    </td>
                                    <td><button onClick={() => handleDeleteService(service)}>
                                        <FaTrash></FaTrash>
                                    </button></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageServices;