import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import MyService from "./MyService";
import swal from "sweetalert";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";

const MyServices = () => {
    // states and contexts
    const { user } = useContext(AuthContext)
    const firebaseEmail = user?.email;

    // my services
    const { data: myServices = [], isLoading, isPending, isFetching, refetch } = useQuery({
        queryKey: ["My Services", firebaseEmail],
        queryFn: async () => {
            const res = await axios.get(`https://local-tour-server.vercel.app/service/${firebaseEmail}`, { withCredentials: true });
            return res.data;
        },
        retry: 2,
        refetchOnWindowFocus: false
    })


    // handle delete
    const handleDelete = (id) => {
        axios.delete(`https://local-tour-server.vercel.app/service/${id}`)
            .then(res => {
                const data = res.data;
                if (data.deletedCount > 0) {
                    swal("Deleted", "Service deleted successfully", "success");
                }
                refetch();
            })
    }

    return (
        <div className="pb-20 bg-gray-50">
            <Helmet>
                <title>Local Tours || My Services</title>
            </Helmet>
            <h2 className="text-center font-extrabold text-cyan-600 text-5xl pb-10">Services of Mr. {user?.displayName}</h2>
            {
                isLoading || isPending || isFetching ?
                    <div className="flex items-center justify-center py-5">
                        <progress className="progress w-56 h-5"></progress>
                    </div>
                    :
                    myServices?.map(data => <MyService
                        key={data._id}
                        data={data}
                        handleDelete={handleDelete}
                    ></MyService>)
            }
        </div>
    );
};

export default MyServices;