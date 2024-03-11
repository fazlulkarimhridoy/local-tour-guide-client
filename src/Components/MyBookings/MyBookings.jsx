import SingleBooking from "./SingleBooking";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import swal from "sweetalert";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";

const MyBookings = () => {
    const { user } = useContext(AuthContext);
    const newEmail = user?.email;


    // useEffect for my bookings
    const { data: bookings = [], isLoading: isBookingLoading, isFetching: isBookingFetching, isPending: isBookingPending, refetch: refetchBooking } = useQuery({
        queryKey: ["myBookings", newEmail],
        queryFn: async () => {
            const res = await axios.get(`https://local-tour-server.vercel.app/myBooking/${newEmail}`, { withCredentials: true });
            return res.data;
        },
        retry: 2,
        refetchOnWindowFocus: false
    })


    const { data: pending = [], isLoading: isPendingLoading, isFetching: isPendingFetching, isPending: isPendingPending, refetch: refetchPending } = useQuery({
        queryKey: ["myPendingWorks", newEmail],
        queryFn: async () => {
            const res = await axios.get(`https://local-tour-server.vercel.app/myPendingWorks/${newEmail}`, { withCredentials: true });
            return res.data;
        },
        retry: 2,
        refetchOnWindowFocus: false
    })


    const handleBookingDelete = (id) => {
        axios.delete(`https://local-tour-server.vercel.app/bookings/${id}`)
            .then(res => {
                const data = res.data
                if (data.deletedCount > 0) {
                    swal("Deleted", "Successfully deleted booking", "success");
                }
                refetchBooking();
                refetchPending();
            })
    }

    return (
        <div className="overflow-x-auto bg-gray-50"
            style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
            }}
        >
            <Helmet>
                <title>Local Tours || Bookings & Pendings</title>
            </Helmet>

            {/* my bookings */}
            <h2 className="text-center font-extrabold text-cyan-600 text-4xl pb-10">Bookings of Mr. {user?.displayName}</h2>
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
                                isBookingLoading || isBookingFetching || isBookingPending ?
                                    <div className="flex items-center justify-center py-5">
                                        <progress className="progress w-56"></progress>
                                    </div>
                                    :
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
            <h2 className="text-center font-extrabold text-cyan-600 text-4xl pb-10">Pending works of Mr. {user?.displayName}</h2>
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
                        isPendingLoading || isPendingFetching || isPendingPending ?
                            <div className="flex items-center justify-center py-5">
                                <progress className="progress w-56"></progress>
                            </div>
                            :
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