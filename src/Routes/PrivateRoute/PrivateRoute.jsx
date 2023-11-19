/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useContext(AuthContext);
    if (loading) {
        // if loading is true show this spinner
        return <div className="flex justify-center pt-40">
            <progress className="progress w-56"></progress>
        </div>
    }
    // if logged in then return the element
    if (user) {
        return children;
    }
    // setting location in sate
    return <Navigate state={location.pathname} to="/login"></Navigate>
};

export default PrivateRoute;