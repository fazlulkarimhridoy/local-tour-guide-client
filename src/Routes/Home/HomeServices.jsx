import axios from "axios";
import SingleService from "../../Components/AllServices/SingleService";
import { useQuery } from "@tanstack/react-query";


const HomeServices = () => {

    const { data: homeServices = [], isLoading, isPending, isFetching, error: serviceError } = useQuery({
        queryKey: ["homeServices"],
        queryFn: async () => {
            const res = await axios.get("https://local-tour-server.vercel.app/services");
            return res.data;
        },
        retry: 2,
        refetchOnWindowFocus: false,
    })

    return (
        <div className="pb-6 bg-gray-50">
            <h2 className="text-center font-extrabold text-cyan-600 text-5xl pb-10">All services</h2>
            {
                serviceError && <div className="flex items-center justify-center py-5">
                    <p className="text-red-600 text-2xl">Internal server error. Reload and try again later.</p>
                </div>
            }
            {
                isLoading || isPending || isFetching ?
                    <div className="flex items-center justify-center py-5">
                        <progress className="progress w-56 h-5"></progress>
                    </div>
                    :
                    homeServices?.slice(0, 4).map(data => <SingleService key={data._id} data={data}></SingleService>)
            }
        </div>
    );
};

export default HomeServices;