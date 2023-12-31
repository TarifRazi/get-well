import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../cmponents/SectionTitle";
import { useFieldArray, useForm } from "react-hook-form";
import useAxiosPrivet from "../../Hooks/useAxiosPrivet";
import Swal from "sweetalert2";


const UpdateDoctor = () => {

    const { name, specialization, qualification, visit_fee, image, details, schedule, _id } = useLoaderData()

    const { register, handleSubmit, reset, control } = useForm({
        defaultValues: {
            name,
            specialization,
            qualification,
            visit_fee,
            image,
            details,
            schedule
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'schedule',
    });

    const axiosSecure = useAxiosPrivet()

    const onSubmit = async (data) => {
        // Convert the array of slots to an object with days as keys and times as values
        const scheduleObject = data.schedule.reduce((acc, slot) => {
            acc[slot.day] = slot.time;
            return acc;
        }, {});

        const formData = {
            ...data,
            schedule: scheduleObject,
        };

        console.log('Form submitted:', formData);

        const doctorData = {
            name: data.name,
            specialization: data.specialization,
            qualification: data.qualification,
            visit_fee: data.visit_fee,
            image: data.image,
            details: data.details,
            schedule: data.schedule
        }
        console.log(doctorData)

        const res = await axiosSecure.patch(`/doctors/${_id}`, doctorData)
        console.log(res)

        if (res.data.modifiedCount > 0) {
            // success popup
            reset()
            Swal.fire({
                title: `${name} has been Updated`,
                text: "You have added a new doctor",
                icon: "success"
            });
        }

    };

    return (
        <div>
            <div>
                <SectionTitle heading='Doctor' subHeading='Update'></SectionTitle>
            </div>
            <div>
                <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                    <label>Name:</label>
                    <input placeholder="Doctors Name" className="input input-bordered w-full my-2" {...register('name')} />

                    <label>Specialization:</label>
                    <input placeholder="Specialization" className="input input-bordered w-full my-2" {...register('specialization')} />

                    <label>Qualification:</label>
                    <input placeholder="Qualification" className="input input-bordered w-full my-2" {...register('qualification')} />

                    <label>Visit Fee:</label>
                    <input placeholder="Visit fee" className="input input-bordered w-full my-2" {...register('visit_fee')} />

                    <label>Image URL:</label>
                    <input placeholder="Image URL" className="input input-bordered w-full my-2" {...register('image')} />

                    <label>Details:</label>
                    <textarea placeholder="Details" className="textarea textarea-bordered h-24 my-2" {...register('details')} />

                    <label>Schedule:</label>
                    <ul className="my-2">
                        {fields.map((slot, index) => (
                            <li className="py-2 flex gap-4" key={slot.id}>
                                <label>Day:</label>
                                <select className="input input-bordered w-full" {...register(`schedule.${index}.day`, { required: true })}>
                                    <option value="Saturday">Saturday</option>
                                    <option value="Sunday">Sunday</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                </select>

                                <label>Time:</label>
                                <input className="input input-bordered w-full" {...register(`schedule.${index}.time`, { required: true })} />

                                <button className="btn btn-outline" type="button" onClick={() => remove(index)}>
                                    Remove Slot
                                </button>
                            </li>
                        ))}
                    </ul>

                    <button className="btn btn-outline w-1/6" type="button" onClick={() => append({ day: 'Monday', time: '' })}>
                        Add Slot
                    </button>

                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateDoctor;