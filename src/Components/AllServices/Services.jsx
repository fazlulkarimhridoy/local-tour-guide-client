
import { useEffect, useState } from "react";
import SingleService from "./SingleService";
import { useLoaderData } from "react-router-dom";

const Services = () => {
    // states & loaders
    const data = useLoaderData();
    const [services, setServices] = useState([]);

    // useEffects
    useEffect(() => {
        setServices(data.slice(0, 6));
    }, [data])

    

    // handle show all
    const handleShowAll = () => {
        setServices(data);
    }

    // handle show less
    const handleShowLess = () =>{
        setServices(data.slice(0,6))
    }

    return (
        <div className="pb-20 bg-gray-50">
            <h2 className="text-center font-extrabold text-cyan-600 text-5xl pb-10">All services</h2>
            {
                services?.map(data => <SingleService key={data._id} data={data}></SingleService>)
            }
            {
                services.length === 6 ?
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