/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const SingleService = ({ data }) => {
    const { _id, ServiceImage, ServiceName, ServiceDescription, ServiceProviderImage, ServiceProviderName, ServicePrice, ServiceArea } = data;
    return (
        <div className="p-4 lg:p-8 bg-gray-50 text-gray-800 lg:w-[1200px] mx-auto">
            <div className="container mx-auto space-y-12">
                <div className="flex flex-col lg:h-[350px] overflow-hidden rounded-md border-2 lg:flex-row">
                    {/* service image */}
                    <img src={ServiceImage} alt="" className="h-[350px] lg:w-[600px] bg-gray-500 aspect-video" />

                    {/* service details */}
                    <div className="flex flex-col justify-center p-6 bg-gray-50">
                        <h3 className="text-3xl font-bold text-cyan-600 pb-3">{ServiceName}</h3>
                        <p className="text-cyan-600 text-lg font-medium pb-2">{ServiceDescription}</p>

                        {/* author information */}
                        <div className="flex items-center pb-2">
                            <div className="avatar pr-4">
                                <div className="w-12 rounded-full">
                                    <img src={ServiceProviderImage} />
                                </div>
                            </div>
                            <div>
                                <h2 className="uppercase text-cyan-600 text-xl font-medium">{ServiceProviderName}</h2>
                            </div>

                        </div>
                        <h2 className="text-cyan-600 pb-2 text-lg font-medium">Service Area : {ServiceArea}</h2>
                        <h2 className="text-cyan-600 pb-4 text-lg font-medium">Price : {ServicePrice}</h2>
                        <Link to={`/services/${_id}`}><button type="button" className="self-start lg:w-[480px] btn bg-cyan-600 text-white hover:bg-sky-400">View Details</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleService;