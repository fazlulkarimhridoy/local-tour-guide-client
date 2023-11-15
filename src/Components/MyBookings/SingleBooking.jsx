/* eslint-disable react/prop-types */

const SingleBooking = ({ data, pending }) => {
    const { serviceName, serviceImage, providerEmail, userEmail, serviceDate, servicePrice, specialInstruction } = data;
    return (

        <tr>
            <th>
                <label>
                    <input type="checkbox" className="checkbox" />
                </label>
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
                            pending? <div className="text-sm opacity-50">{userEmail}</div> : <div className="text-sm opacity-50">{providerEmail}</div>
                        }
                    </div>
                </div>
            </td>
            <td>
                <br />
                <span className="badge badge-ghost badge-sm">{servicePrice}</span>
            </td>
            <td>
                <br />
                <span className="badge badge-ghost badge-sm">{serviceDate}</span>
            </td>
            <td>{specialInstruction}</td>
            <th>
                <button className="btn btn-ghost btn-xs">details</button>
            </th>
        </tr>
    );
};

export default SingleBooking;