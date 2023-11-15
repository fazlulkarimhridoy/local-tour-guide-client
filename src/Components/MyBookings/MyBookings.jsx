import SingleBooking from "./SingleBooking";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";

const MyBookings = () => {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);  
    const newEmail = user.email;

    useEffect(() => {
        axios.get(`http://localhost:5000/myBooking/${newEmail}`)
            .then(res => {
                setData(res.data)
            });
    }, [newEmail])
    return (
        <div className="overflow-x-auto bg-gray-50">
            <h2 className="text-center font-extrabold text-cyan-600 text-5xl pb-10">Bookings for Mr. {user.displayName}</h2>
            <table className="table w-3/4 mx-auto">
                <thead>
                    <tr>
                        <th></th>
                        <th>Service Information</th>
                        <th>Price</th>
                        <th>Booked Date</th>
                        <th>Special Instruction</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map(data => <SingleBooking key={data._id} data={data}></SingleBooking>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyBookings;