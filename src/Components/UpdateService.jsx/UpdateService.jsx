import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const UpdateService = () => {
    const serviceData = useLoaderData();
    const { _id, ServiceProviderEmail, ServiceImage, ServiceName, ServiceDescription, ServiceProviderImage, ServiceProviderName, ServicePrice, ServiceArea } = serviceData;
    const location = useLocation();
    const navigate = useNavigate();

    // handle update
    const handleUpdate = (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget)
        const ServiceName = form.get("service_name");
        const ServiceImage = form.get("service_image");
        const ServiceProviderName = form.get("provider_name");
        const ServiceProviderImage = form.get("provider_image");
        const ServiceArea = form.get("service_area");
        const ServicePrice = form.get("service_price");
        const ServiceProviderEmail = form.get("provider_email");
        const ServiceDescription = form.get("service_description");

        // sending data to backend
        axios.put(`https://local-tour-server.vercel.app/services/${_id}`, {
            ServiceName,
            ServiceImage,
            ServiceProviderName,
            ServiceProviderImage,
            ServiceArea,
            ServicePrice,
            ServiceDescription,
            ServiceProviderEmail
        })
            .then(res => {
                const data = res.data;
                console.log(data);
                if (data.modifiedCount > 0) {
                    swal("Updated", "Successfully updated service", "success");
                    navigate(location?.state ? location.state : "/myServices");
                }
            })

    }





    return (
        <section className="bg-gray-50" >
            <Helmet>
                <title>Local Tours || Update Services</title>
            </Helmet>
            <h2 className="text-3xl text-cyan-600 font-bold text-center">Create a new service here</h2>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                    <form onSubmit={handleUpdate} action="" className="space-y-4">
                        {/* service name & image */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Service Name
                                </label>
                                <input
                                    className="w-full rounded-lg border p-3 text-sm"
                                    placeholder="Service Name"
                                    type="text"
                                    name="service_name"
                                    defaultValue={ServiceName}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Service Image
                                </label>
                                <input
                                    className="w-full rounded-lg border p-3 text-sm"
                                    placeholder="Service Image Url"
                                    type="text"
                                    name="service_image"
                                    defaultValue={ServiceImage}
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
                                    defaultValue={ServiceProviderName}
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
                                    defaultValue={ServiceProviderImage}
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
                                    className="w-full rounded-lg border p-3 text-sm"
                                    placeholder="Service Area"
                                    type="text"
                                    name="service_area"
                                    defaultValue={ServiceArea}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Service Price
                                </label>
                                <input
                                    className="w-full rounded-lg border p-3 text-sm"
                                    placeholder="Price"
                                    type="text"
                                    name="service_price"
                                    defaultValue={ServicePrice}
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
                                defaultValue={ServiceProviderEmail}
                                readOnly
                            />
                        </div>

                        {/* description */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Service Description
                            </label>
                            <textarea
                                className="w-full rounded-lg border p-3 text-sm"
                                placeholder="Message"
                                type="text"
                                name="service_description"
                                rows="8"
                                defaultValue={ServiceDescription}
                            ></textarea>
                        </div>

                        {/*button  */}
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="inline-block w-full rounded-lg bg-cyan-600 px-5 py-3 font-medium text-white sm:w-auto"
                            >
                                Update Service
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default UpdateService;