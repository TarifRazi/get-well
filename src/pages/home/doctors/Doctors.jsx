
import { useEffect, useState } from 'react';
import SectionTitle from '../../../cmponents/SectionTitle';
import DoctorCard from '../../../cmponents/DoctorCard';

const Doctors = () => {

    const [allDoctors, setAllDoctors] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/doctors`)
            .then((res) => res.json())
            .then((data) => setAllDoctors(data))


    }, [])

    return (
        <div>
            <SectionTitle
                subHeading={"Here is our"}
                heading={"Doctors"}
            ></SectionTitle>

            <div>
                {
                    allDoctors.map(doctors => <DoctorCard
                    key={doctors._id}
                    doctors={doctors}
                    ></DoctorCard>)
                }
            </div>
        </div>


    );
};

export default Doctors;