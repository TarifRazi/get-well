
import { useLoaderData } from 'react-router-dom';
import SectionTitle from '../../cmponents/SectionTitle';
import { useFieldArray, useForm } from 'react-hook-form';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAxiosPrivet from '../../Hooks/useAxiosPrivet';
import Swal from 'sweetalert2';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateService = () => {

    const { title, description, cost, availableDate, discount, image, slots, _id } = useLoaderData()
    // const service = useLoaderData()
    // console.log(slots)

    const { register, handleSubmit, control, reset } = useForm({
        defaultValues: {
            title,
            description,
            cost,
            availableDate,
            discount,
            image,
            slots
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'slots',
    });

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosPrivet()
    const onSubmit = async (data) => {
        console.log(data);

        const imageFile = { image: data.image[0] }
        // console.log(imageFile)
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        console.log(res.data)

        if (res.data.success) {
            const serviceData = {
                title: data.title,
                description: data.description,
                cost: parseFloat(data.cost),
                availableDate: data.availableDate,
                discount: parseFloat(data.discount),
                image: res.data.data.display_url,
                slots: data.slots
            }
            // console.log(serviceData)

            const serviceRes = await axiosSecure.patch(`/services/${_id}`, serviceData)
            console.log(serviceRes.data);
            if (serviceRes.data.modifiedCount > 0) {
                // success popup
                reset()
                Swal.fire({
                    title: `${title} is updated`,
                    text: "You have added a new service",
                    icon: "success"
                });
            }
        }
    }

    return (
        <div>
            <div>
                <SectionTitle subHeading="update Your" heading="Service" ></SectionTitle>
            </div>
            <div>
                <form
                    className="flex flex-col m-11"
                    onSubmit={handleSubmit(onSubmit)}>
                    <label>Title:</label>
                    <input placeholder="Add title" className="input input-bordered w-full my-2" {...register('title', { required: true })} />

                    <label>Description:</label>
                    <textarea placeholder="Add description" className="textarea textarea-bordered h-24 my-2" {...register('description', { required: true })} />

                    <label>Cost:</label>
                    <input placeholder="Cost" className="input input-bordered w-full my-2" type="number" {...register('cost', { required: true })} />

                    <label>Available Date:</label>
                    <input className="input input-bordered w-full my-2" type="date" {...register('availableDate', { required: true })} />

                    <label>Discount:</label>
                    <input placeholder="Discount" className="input input-bordered w-full my-2" type="number" {...register('discount', { required: true })} />

                    <label>Image URL:</label>
                    {/* <input placeholder="Image url" className="input input-bordered w-full my-2" {...register('image', { required: true })} /> */}
                    <input type="file" className="file-input file-input-bordered w-full my-2" {...register('image', { required: true })} />

                    <label>Slots:</label>
                    <ul className="my-2">
                        {fields.map((slot, index) => (
                            <li className="py-2 flex gap-4" key={slot.id}>
                                <label>Time:</label>
                                <input className="input input-bordered w-full" {...register(`slots.${index}.time`, { required: true })} />

                                <label>Status:</label>
                                <input className="input input-bordered w-full" {...register(`slots.${index}.status`, { required: true })} />

                                <button className="btn btn-outline" type="button" onClick={() => remove(index)}>
                                    Remove Slot
                                </button>
                            </li>
                        ))}
                    </ul>

                    <button className="btn btn-outline w-1/6" type="button" onClick={() => append({ time: '', status: '' })}>
                        Add Slot
                    </button>

                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateService;