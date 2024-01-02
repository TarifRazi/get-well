import { useEffect, useState } from "react";
import SectionTitle from "../../cmponents/SectionTitle";
import ServiceCard from "../../cmponents/ServiceCard";
import Banner from "./banner/Banner";
import Doctors from "./doctors/Doctors";


const Home = () => {


    const [allServices, setAllServices] = useState([])
    useEffect(() => {
        fetch(`https://get-well-server.vercel.app/services`)
            .then((res) => res.json())
            .then((data) => setAllServices(data))


    }, [])

    return (
        <div className="text-center">
            <Banner></Banner>
            <SectionTitle
            subHeading={"Here is our"}
            heading={"Services"}
            ></SectionTitle>

            <div>
           
            {
                allServices.map(service => <ServiceCard 
                    key={service._id}
                    service ={service}
                ></ServiceCard>)
            }
            </div>

            <div>
                <Doctors></Doctors>
            </div>
        </div>
    );
};

export default Home;