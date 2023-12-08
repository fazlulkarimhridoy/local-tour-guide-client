import axios from "axios";
import SingleService from "../../Components/AllServices/SingleService";
import { useEffect, useState } from "react";


const HomeServices = () => {
    const [homeData, setHomeData] = useState([]);
    useEffect(() => {
        axios.get("https://local-tour-server.vercel.app/services")
            .then(res => {
                const data = res.data;
                setHomeData(data)
            })
    }, [])
  
    return (
        <div className="pb-6 bg-gray-50">
            <h2 className="text-center font-extrabold text-cyan-600 text-5xl pb-10">All services</h2>
            {
                homeData?.slice(0, 4).map(data => <SingleService key={data._id} data={data}></SingleService>)
            }
        </div>
    );
};

export default HomeServices;