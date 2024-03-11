
// import { useEffect, useState } from "react";
import SingleService from "./SingleService";
// import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Services = () => {
    // const loaderData = useLoaderData();
    // const [services, setServices] = useState([]);

    const { data: services = [], isLoading, isPending, isFetching } = useQuery({
        queryKey: ["services"],
        queryFn: async () => {
            const res = await axios.get("https://local-tour-server.vercel.app/services");
            return res.data;
        },
        retry: 2,
        refetchOnWindowFocus: false
    })

    // useEffect(() => {
    //     setServices(data);
    // }, [data])


    // useEffects
    // useEffect(() => {
    //     setServices(data?.slice(0, 6));
    // }, [data])



    // handle show all
    // const handleShowAll = () => {
    //     setServices(data);
    // }

    // handle show less
    // const handleShowLess = () => {
    //     setServices(data?.slice(0, 6))
    // }


    // const handleSearch = async (e) => {
    //     e.preventDefault();
    //     const form = new FormData(e.currentTarget);
    //     const search = form.get("search");
    //     await axios.get(`https://local-tour-server.vercel.app/findService/${search}`)
    //         .then(res => {
    //             const data = res.data;
    //             setServices(data);
    //         })
    // }


    return (
        <div className="pb-20 bg-gray-50">
            <Helmet>
                <title>Local Tours || All Services</title>
            </Helmet>
            <h2 className="text-center font-extrabold text-cyan-600 text-5xl pb-10">All services</h2>
            {/* <div className="relative w-1/3 mx-auto">
                <label htmlFor="Search" className="sr-only"> Search </label>

                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        name="search"
                        placeholder="Search for..."
                        className="w-full p-3 rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
                    />

                    <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                        <button type="submit" className="text-gray-600 hover:text-gray-700">
                            <span className="sr-only">Search</span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-4 w-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                />
                            </svg>
                        </button>
                    </span>
                </form>
            </div> */}
            {
                isLoading || isPending || isFetching ?
                    <div className="flex items-center justify-center py-5">
                        <progress className="progress w-56"></progress>
                    </div> :
                    services?.map(data => <SingleService key={data._id} data={data}></SingleService>)
            }
            {/* {
                services.length <= 6 ?
                    <div className="flex justify-center">
                        <button onClick={handleShowAll} className="btn bg-cyan-600 hover:bg-sky-400 text-center text-white">Show All</button>
                    </div> :
                    <div className="flex justify-center">
                        <button onClick={handleShowLess} className="btn bg-cyan-600 hover:bg-sky-400 text-center text-white">Show less</button>
                    </div>
            } */}
        </div>
    );
};

export default Services;