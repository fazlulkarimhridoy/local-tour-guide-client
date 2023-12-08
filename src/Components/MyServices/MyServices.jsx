import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import MyService from "./MyService";
import swal from "sweetalert";
import { Helmet } from "react-helmet-async";

const MyServices = () => {
    // states and contexts
    const { user, loading } = useContext(AuthContext)
    const [myServices, setMyServices] = useState([]);
    const firebaseEmail = user.email;


    // useEffect for fetching data
    useEffect(() => {
        axios.get(`https://local-tour-server.vercel.app/service/${firebaseEmail}`, { withCredentials: true })
            .then(res => {
                const data = res.data;
                setMyServices(data);
            })
    }, [firebaseEmail])

    // if loading then show this progress
    if (loading) {
        return <div className="flex justify-center pt-40">
            <progress className="progress w-56"></progress>
        </div>
    }

    // handle delete
    const handleDelete = (id) => {
        axios.delete(`https://local-tour-server.vercel.app/service/${id}`)
            .then(res => {
                const data = res.data;
                console.log(data);
                if (data.deletedCount > 0) {
                    swal("Deleted", "Service deleted successfully", "success");
                    const remainingServices = myServices.filter(data => data._id != id);
                    setMyServices(remainingServices);
                }
            })
    }

    return (
        <div className="pb-20 bg-gray-50">
            <Helmet>
                <title>Local Tours || My Services</title>
            </Helmet>
            <h2 className="text-center font-extrabold text-cyan-600 text-5xl pb-10">Services of Mr. {user.displayName}</h2>
            {
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