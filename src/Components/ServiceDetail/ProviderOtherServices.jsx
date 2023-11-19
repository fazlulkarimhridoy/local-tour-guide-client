/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const ProviderOtherServices = ({ data }) => {
    // states and loaders
    const { _id, ServiceProviderEmail, ServiceImage, ServiceName, ServiceProviderName, ServicePrice, ServiceArea } = data;

    return (
        <Link to={`/services/${_id}`}>
            <article className="flex flex-col border bg-gray-50">
                <img alt="" className="object-cover w-full h-52 bg-gray-500" src={ServiceImage} />
                <div className="flex flex-col flex-1 p-6">
                    <h3 className="flex-1 py-2 text-lg font-semibold">{ServiceName}</h3>
                    <p rel="noopener noreferrer" className="text-xs uppercase hover:underline text-cyan-600">{ServiceProviderName}</p>
                    <p rel="noopener noreferrer" className="text-xs uppercase hover:underline text-cyan-600">{ServiceProviderEmail}</p>
                    <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs text-gray-600">
                        <span>{ServiceArea}</span>
                        <span>{ServicePrice}৳</span>
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default ProviderOtherServices;