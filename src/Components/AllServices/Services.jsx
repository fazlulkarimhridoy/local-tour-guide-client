import SingleService from "./SingleService";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Services = () => {

    const { data: services = [], isLoading, isPending, isFetching, error: allServicesError } = useQuery({
        queryKey: ["services"],
        queryFn: async () => {
            const res = await axios.get("https://local-tour-server.vercel.app/services");
            return res.data;
        },
        retry: 2,
        refetchOnWindowFocus: false
    })

    return (
        <div className="py-20 bg-gray-50 min-h-screen">
            <Helmet>
                <title>Local Tours || All Services</title>
            </Helmet>
            <h2 className="text-center font-extrabold text-cyan-600 text-5xl pb-10">All services</h2>

            {
                allServicesError && <div className="flex items-center justify-center py-60">
                    <p className="text-red-600 text-2xl">Internal server error. Reload and try again later.</p>
                </div>
            }

            {
                isLoading || isPending || isFetching ?
                    <div className="flex items-center justify-center top-[50%] py-60">
                        <progress className="progress w-56 h-5"></progress>
                    </div> :
                    services?.map(data => <SingleService key={data._id} data={data}></SingleService>)
            }

        </div>
    );
};

export default Services;