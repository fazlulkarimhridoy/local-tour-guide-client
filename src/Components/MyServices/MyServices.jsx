import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import MyService from "./MyService";
import swal from "sweetalert";

const MyServices = () => {
    // states and contexts
    const { user } = useContext(AuthContext)
    const [myServices, setMyServices] = useState([]);
    const firebaseEmail = user.email;

    // useEffect for fetching data
    useEffect(() => {
        axios.get(`http://localhost:5000/service/${firebaseEmail}`)
            .then(res => {
                const data = res.data;
                setMyServices(data);
            })
    }, [firebaseEmail])

    // handle delete
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/service/${id}`)
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