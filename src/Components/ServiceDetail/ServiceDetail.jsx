import { useContext, useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import swal from "sweetalert";
import ProviderOtherServices from "./ProviderOtherServices";

const ServiceDetail = () => {
    // states and loaders
    const serviceDetails = useLoaderData();
    const { _id, ServiceProviderEmail, ServiceImage, ServiceName, ServiceDescription, ServiceProviderImage, ServiceProviderName, ServicePrice, ServiceArea } = serviceDetails;
    const { user } = useContext(AuthContext);
    const [providerEmail, setProviderEmail] = useState("");
    const [otherServices, setOtherServices] = useState([]);
    const navigate = useNavigate();

    // useEffect for provider email
    useEffect(() => {
        setProviderEmail(ServiceProviderEmail);
    }, [ServiceProviderEmail])

    // useEffect for provider all service
    useEffect(() => {
        axios.get(`http://localhost:5000/service/${providerEmail}`)
            .then(res => {
                const data = res.data;
                console.log(data);
                const remainingOthers = data.filter(data => data._id != _id);
                setOtherServices(remainingOthers);
            })
    }, [providerEmail, _id])


    // handle purchase
    const handlePurchase = (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget)
        const serviceName = form.get("service_name");
        const serviceImage = form.get("service_image");
        const providerEmail = form.get("provider_email");
        const userEmail = form.get("user_email");
        const serviceDate = form.get("service_date");
        const servicePrice = form.get("service_price");
        const specialInstruction = form.get("special_instruction");

        // use effect
        axios.post("http://localhost:5000/addBooking", {
            serviceName,
            serviceImage,
            providerEmail,
            userEmail,
            serviceDate,
            servicePrice,
            specialInstruction
        })
            .then(res => {
                console.log(res.data.insertedId);
                if (res.data.insertedId) {
                    navigate("/services");
                    swal("Booking Completed", "Successfully added booking", "success");
                }
            })
    }



    return (
        <section className="bg-gray-50">

            {/* service details */}
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
                        <img
                            alt="Party"
                            src={ServiceImage}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>

                    <div className="">
                        {/* author information */}
                        <div className="p-8 sm:flex sm:space-x-6 bg-gray-100 text-gray-800 mb-6 shadow-lg">
                            <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
                                <img src={ServiceProviderImage} alt="" className="object-cover object-center w-full h-full rounded bg-gray-500" />
                            </div>
                            <div className="flex flex-col space-y-4">
                                <div>
                                    <h2 className="text-2xl font-semibold">{ServiceProviderName}</h2>                                </div>
                                <div className="space-y-1">
                                    <span className="flex items-center space-x-2">
                                        <FiMapPin></FiMapPin>
                                        <span className="text-gray-600">{ServiceArea}</span>
                                    </span>

                                    <span className="flex items-center space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Phonenumber" className="w-4 h-4">
                                            <path fill="currentColor" d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"></path>
                                        </svg>
                                        <span className="text-gray-600">+8801634468473</span>
                                    </span>
                                    <span className="flex items-center space-x-2">
                                        <MdOutlineEmail></MdOutlineEmail>
                                        <span className="text-gray-600">{ServiceProviderEmail}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* service details */}
                        <h2 className="text-3xl font-bold sm:text-4xl">{ServiceName}</h2>
                        <p className="mt-4 text-gray-600">
                            {ServiceDescription}
                        </p>
                        <h2 className="text-lg font-medium">Price : {ServicePrice}</h2>

                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button className="btn mt-8 inline-block rounded-md bg-cyan-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-cyan-700 focus:outline-none focus:ring focus:ring-cyan-400" onClick={() => document.getElementById('my_modal_5').showModal()}>Book Now</button>
                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                            <div className="bg-white border p-6 w-1/2">
                                <div className="lg:col-span-7  xl:col-span-6">
                                    <h1 className="text-xl mb-2 text-cyan-600 font-bold text-center">Service Confirmation</h1>
                                    <div>
                                        <form onSubmit={handlePurchase} method="dialog" className="grid grid-cols-6 gap-6">
                                            {/* first row */}
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">Service Name</label>
                                                <input
                                                    defaultValue={ServiceName}
                                                    readOnly
                                                    placeholder="Service Name"
                                                    type="text"
                                                    name="service_name"
                                                    className="mt-1 p-2 w-full border bg-white text-sm text-gray-700"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">Service Image</label>
                                                <input
                                                    defaultValue={ServiceImage}
                                                    readOnly
                                                    placeholder="Service Image"
                                                    type="text"
                                                    name="service_image"
                                                    className="mt-1 p-2 w-full border bg-white text-sm text-gray-700"
                                                />
                                            </div>

                                            {/* second row */}
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">Service Provider Email</label>
                                                <input
                                                    defaultValue={ServiceProviderEmail}
                                                    readOnly
                                                    placeholder="Provider Email"
                                                    type="email"
                                                    name="provider_email"
                                                    className="mt-1 p-2 w-full border bg-white text-sm text-gray-700"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">User Email</label>
                                                <input
                                                    defaultValue={user.email}
                                                    readOnly
                                                    placeholder="User Email"
                                                    type="email"
                                                    name="user_email"
                                                    className="mt-1 p-2 w-full border bg-white text-sm text-gray-700"
                                                />
                                            </div>

                                            {/* third row */}
                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">Service Date</label>
                                                <input
                                                    placeholder="Service Date"
                                                    type="date"
                                                    name="service_date"
                                                    className="mt-1 p-2 w-full border bg-white text-sm text-gray-700"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700">Service Price</label>
                                                <input
                                                    defaultValue={ServicePrice}
                                                    readOnly
                                                    placeholder="Service Price"
                                                    type="text"
                                                    name="service_price"
                                                    className="mt-1 p-2 w-full border bg-white text-sm text-gray-700"
                                                />
                                            </div>

                                            {/* fourth row */}
                                            <div className="col-span-6">
                                                <label className="block text-sm font-medium text-gray-700">Special Instructions</label>
                                                <input
                                                    placeholder="Special Instruction"
                                                    type="text"
                                                    name="special_instruction"
                                                    className="mt-1 p-2 w-full border bg-white text-sm text-gray-700"
                                                />
                                            </div>

                                            {/* purchase button */}
                                            <button type="submit" className="inline-block rounded-md border border-cyan-600 bg-cyan-600 px-2 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-cyan-600 focus:outline-none focus:ring active:text-cyan-500">
                                                Confirm
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>

            {/* other services of this user */}
            <div>
                <section className="py-6 sm:py-12 bg-gray-100 text-gray-800">
                    <div className="container p-6 mx-auto space-y-8">
                        <div className="space-y-2 text-center">
                            <h2 className="text-3xl font-bold">Provider related other services</h2>
                            <p className="font-serif text-sm text-gray-600">All other services of this provider is showing below.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
                            {
                                otherServices?.map(data => <ProviderOtherServices key={data._id} data={data}></ProviderOtherServices>)
                            }
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default ServiceDetail;