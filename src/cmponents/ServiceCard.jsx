import { Link } from "react-router-dom";


const ServiceCard = ({ service }) => {
    const { _id, title, description, cost, image, discount } = service || {};

    // const handleDetails = (_id) => {
    //     console.log(_id)
    // }

    return (
        <div>
            <div className="card card-side bg-base-100 shadow-xl m-7">
                <figure><img src={image} /></figure>
                <div className="card-body text-left">
                    <h2 className="card-title">{title}</h2>
                    <p className="">{description}</p>
                    <p>Cost: ${cost}</p>
                    <p className="text-red-600 font-semibold">Discount: ${discount}</p>
                    <div className="card-actions justify-end">

                        <Link to={`/testDetails/${_id}`}>
                        <button className="btn btn-primary">Details</button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
