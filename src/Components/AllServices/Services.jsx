
import { useEffect, useState } from "react";
import SingleService from "./SingleService";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";
// import axios from "axios";

const Services = () => {
    // states & loaders
    const loaderData = useLoaderData();
    const [services, setServices] = useState([]);

    // useEffects
    useEffect(() => {
        setServices(loaderData.slice(0, 6));
    }, [loaderData])



    // handle show all
    const handleShowAll = () => {
        setServices(loaderData);
    }

    // handle show less
    const handleShowLess = () => {
        setServices(loaderData.slice(0, 6))
    }


    const handleSearch = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const search = form.get("search");
        console.log(search);


        fetch(`http://localhost:5000/findService/${search}`)
            .then(res => res.json())
            .then(result => {
                setServices(result);
            })
    }



    return (
        <div className="pb-20 bg-gray-50">
            <Helmet>
                <title>Local Tours || All Services</title>
            </Helmet>
            <h2 className="text-center font-extrabold text-cyan-600 text-5xl pb-10">All services</h2>
            <div className="relative w-1/3 mx-auto">
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
            </div>
            {
                services?.map(data => <SingleService key={data._id} data={data}></SingleService>)
            }
            {
                services.length <= 6 ?
                    <div className="flex justify-center">
                        <button onClick={handleShowAll} className="btn bg-cyan-600 hover:bg-sky-400 text-center text-white">Show All</button>
                    </div> :
                    <div className="flex justify-center">
                        <button onClick={handleShowLess} className="btn bg-cyan-600 hover:bg-sky-400 text-center text-white">Show less</button>
                    </div>
            }
        </div>
    );
};

export default Services;