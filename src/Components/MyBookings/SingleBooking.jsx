/* eslint-disable react/prop-types */


const SingleBooking = ({ data, pending, handleBookingDelete }) => {
    const { _id, serviceName, serviceImage, providerEmail, userEmail, serviceDate, servicePrice, specialInstruction } = data;


    return (

        <tr>
            <th>
                <button onClick={() => handleBookingDelete(_id)} className="btn btn-circle btn-sm btn-outline">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </th>

            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={serviceImage} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{serviceName}</div>

                        {
                            pending ? <div className="text-sm opacity-50">{userEmail}</div> : <div className="text-sm opacity-50">{providerEmail}</div>
                        }
                    </div>
                </div>
            </td>
            <td>
                <br />
                <span className="badge badge-ghost badge-sm">{servicePrice}৳</span>
            </td>
            <td>
                <br />
                <span className="badge badge-ghost badge-sm">{serviceDate}</span>
            </td>
            <td>{specialInstruction}</td>
            <th>

                {
                    pending ?
                        <div className="dropdown dropdown-bottom">
                            <label tabIndex={0} className="btn btn-ghost btn-sm">Pending</label>
                            <ul tabIndex={0} className="dropdown-content z-[1] w-36 py-3 bg-gray-100">
                                <li className="btn btn-ghost btn-sm">In Progress</li>
                                <li className="btn btn-ghost btn-sm">Completed</li>
                            </ul>
                        </div> : <button className="btn btn-ghost btn-sm">View Details</button>
                }
            </th>
        </tr>
    );
};

export default SingleBooking;