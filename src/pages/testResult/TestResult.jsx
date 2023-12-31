import Swal from "sweetalert2";
import useBookTest from "../../Hooks/useBookTest";
import useAxiosPrivet from "../../Hooks/useAxiosPrivet";


const TestResult = () => {

    const [tests, refetch] = useBookTest()
    const totalCost = tests.reduce((total, tests) => total + tests.cost, 0)
    const axiosSecure = useAxiosPrivet()

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


                axiosSecure.delete(`/tests/${id}`)
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
        <div>
            <div className="flex justify-between items-center">
                <h1>Total tests: {tests.length}</h1>
                <h1>Total test cost: {totalCost}$</h1>
                <button className="btn btn-neutral">Pay</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Test Name</th>
                            <th>Cost</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tests.map((bookedTests, index) => <tr key={bookedTests._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={bookedTests.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {bookedTests.title}
                                </td>
                                <td>{bookedTests.cost}$</td>
                                <th>
                                    <button
                                        onClick={() => handleDelete(bookedTests._id)}
                                        className="btn btn-ghost btn-xs">X</button>
                                </th>
                            </tr>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default TestResult;