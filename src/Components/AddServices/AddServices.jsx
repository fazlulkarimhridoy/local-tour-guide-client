import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import swal from "sweetalert";

const AddServices = () => {
    // states & constructors
    const { user } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");

    // states for form reset
    const [serviceName, setServiceName] = useState("")
    const [serviceImage, setServiceImage] = useState("")
    const [serviceArea, setServiceArea] = useState("")
    const [servicePrice, setServicePrice] = useState("")
    const [ServiceDescription, setServiceDescription] = useState("")

    // user information from firebase
    const userName = user.displayName;
    const userEmail = user.email;
    const userImage = user.photoURL;

    // useEffect for name
    useEffect(() => {
        setName(userName)
    }, [userName])

    // useEffect for email
    useEffect(() => {
        setEmail(userEmail)
    }, [userEmail])

    // useEffect for image
    useEffect(() => {
        setImage(userImage)
    }, [userImage])

    // handle add service
    const handleAddService = (event) => {
        event.preventDefault();
        setServiceName("");
        setServiceImage("");
        setServiceArea("");
        setServicePrice("");
        setServiceDescription("");
        const form = new FormData(event.currentTarget)
        const ServiceName = form.get("service_name");
        const ServiceImage = form.get("service_image");
        const ServiceProviderName = form.get("provider_name");
        const ServiceProviderImage = form.get("provider_image");
        const ServiceArea = form.get("service_area");
        const ServicePrice = form.get("service_price");
        const ServiceProviderEmail = form.get("provider_email");
        const ServiceDescription = form.get("service_description");

        axios.post("http://localhost:5000/addService", {
            
            ServiceImage,
            ServiceName,
            ServiceDescription,
            ServiceProviderImage,
            ServiceProviderName,
            ServiceArea,
            ServicePrice,
            ServiceProviderEmail,
        })
            .then(res => {
                console.log(res.data);
                if(res.data.insertedId){
                    swal("Successful", "New service added", "success")
                }
            })

    }

    return (
        <section className="bg-gray-50" >
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                    <form onSubmit={handleAddService} action="" className="space-y-4">
                        {/* service name & image */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Service Name
                                </label>
                                <input 
                                    value={serviceName}
                                    onChange={(event)=> setServiceName(event.target.value)}
                                    className="w-full rounded-lg border p-3 text-sm"
                                    placeholder="Service Name"
                                    type="text"
                                    name="service_name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Service Image
                                </label>
                                <input
                                    value={serviceImage}
                                    onChange={(event)=>setServiceImage(event.target.value)}
                                    className="w-full rounded-lg border p-3 text-sm"
                                    placeholder="Service Image Url"
                                    type="text"
                                    name="service_image"
                                />
                            </div>
                        </div>

                        {/* provider name & image */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Provider Name
                                </label>
                                <input
                                    className="w-full rounded-lg border p-3 text-sm"
                                    placeholder="Provider Name"
                                    type="text"
                                    name="provider_name"
                                    defaultValue={name}
                                    readOnly
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Provider Image
                                </label>
                                <input
                                    className="w-full rounded-lg border p-3 text-sm"
                                    placeholder="Provider Image Url"
                                    type="text"
                                    name="provider_image"
                                    defaultValue={image}
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* service area & price */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Service Area
                                </label>
                                <input
                                    value={serviceArea}
                                    onChange={(event)=> setServiceArea(event.target.value)}
                                    className="w-full rounded-lg border p-3 text-sm"
                                    placeholder="Service Area"
                                    type="text"
                                    name="service_area"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Service Price
                                </label>
                                <input
                                    value={servicePrice}
                                    onChange={(event)=> setServicePrice(event.target.value)}
                                    className="w-full rounded-lg border p-3 text-sm"
                                    placeholder="Price"
                                    type="text"
                                    name="service_price"
                                />
                            </div>
                        </div>

                        {/* provider email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Provider Email
                            </label>
                            <input
                                className="w-full rounded-lg border p-3 text-sm"
                                placeholder="Provider Email"
                                type="email"
                                name="provider_email"
                                defaultValue={email}
                                readOnly
                            />
                        </div>

                        {/* description */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Service Description
                            </label>
                            <textarea
                                value={ServiceDescription}
                                onChange={(event)=> setServiceDescription(event.target.value)}
                                className="w-full rounded-lg border p-3 text-sm"
                                placeholder="Message"
                                type="text"
                                name="service_description"
                                rows="8"
                            ></textarea>
                        </div>

                        {/*button  */}
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="inline-block w-full rounded-lg bg-cyan-600 px-5 py-3 font-medium text-white sm:w-auto"
                            >
                                Add Service
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddServices;