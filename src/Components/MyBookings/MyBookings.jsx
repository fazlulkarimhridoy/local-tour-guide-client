import SingleBooking from "./SingleBooking";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import swal from "sweetalert";
import { Helmet } from "react-helmet-async";

const MyBookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [pending, setPending] = useState([])
    const newEmail = user.email;

    // useEffect for my bookings
    useEffect(() => {
        axios.get(`http://localhost:5000/myBooking/${newEmail}`, { withCredentials: true })
            .then(res => {
                setBookings(res.data)
            });
    }, [newEmail])

    // useEffect for my pending works
    useEffect(() => {
        axios.get(`http://localhost:5000/myPendingWorks/${newEmail}`, { withCredentials: true })
            .then(res => {
                setPending(res.data)
                console.log(res.data);
            })
    }, [newEmail])

    const handleBookingDelete = (id) => {
        axios.delete(`http://localhost:5000/bookings/${id}`)
            .then(res => {
                const data = res.data
                console.log(data);
                if (data.deletedCount > 0) {
                    swal("Deleted", "Successfully deleted booking", "success");
                    const remainingBookings = bookings.filter(data => data._id != id);
                    const remainingPendings = pending.filter(data => data._id != id)
                    setBookings(remainingBookings);
                    setPending(remainingPendings);

                }
            })
    }

    return (
        <div className="overflow-x-auto bg-gray-50">
            <Helmet>
            <title>Local Tours || Bookings & Pendings</title>
            </Helmet>

            {/* my bookings */}
            <h2 className="text-center font-extrabold text-cyan-600 text-4xl pb-10">Bookings of Mr. {user.displayName}</h2>
            {
                bookings ?
                    <table className="table border-2 w-3/4 mx-auto mb-10">
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
                                bookings?.map(data =>
                                    <SingleBooking
                                        key={data._id}
                                        handleBookingDelete={handleBookingDelete}
                                        data={data}></SingleBooking>)
                            }
                        </tbody>
                    </table>
                    :
                    <h3 className="text-center text-xl font-medium">No bookings found</h3>
            }

            {/* my services people booked */}
            <h2 className="text-center font-extrabold text-cyan-600 text-4xl pb-10">Pending works of Mr. {user.displayName}</h2>
            <table className="table border-2 w-3/4 mx-auto">
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
                        pending?.map(data => <SingleBooking
                            key={data._id}
                            pending={pending}
                            handleBookingDelete={handleBookingDelete}
                            data={data}></SingleBooking>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyBookings;