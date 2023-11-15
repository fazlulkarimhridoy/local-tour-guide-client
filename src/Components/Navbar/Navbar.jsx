import { useContext} from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import swal from 'sweetalert';


const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    // handle logout
    const handleLogout = () => {
        logout()
            .then(() => {
                swal("Logout!", "Successfully logged out!", "success");
            })
            .catch()
    }


    // nav links
    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/services">Services</NavLink></li>
        {
            user ?
                <li>
                    <div className="dropdown dropdown-bottom">
                        <label tabIndex={0}>Dashboard</label>
                        <ul tabIndex={0} className="dropdown-content z-[1] w-36 py-3 bg-gray-100">
                            <li><Link to="/myServices">My-services</Link></li>
                            <li><Link to="/addServices">Add-services</Link></li>
                            <li><Link to="/myBookings">My-schedules</Link></li>
                        </ul>
                    </div>
                </li> : ""
        }
        {
            user ?
                "" :
                <>
                    <li><NavLink to="/login">Login</NavLink></li>
                    <li><NavLink to="/register">Register</NavLink></li>
                </>

        }
    </>
    return (
        <div className="navbar bg-gray-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <img className="pl-4 rounded-full w-1/5" src="https://i.ibb.co/mD8wJc4/Screenshot-406.png" alt="" />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-x-3">
                    {links}
                </ul>
            </div>
            <div className="navbar-end pr-4">
                {
                    user ?
                        <>  
                            <img alt="" className="w-12 h-12 rounded-full mr-3 ri ri bg-gray-500 ri ri" src={user?.photoURL} />
                            <button onClick={handleLogout} className="border bg-orange-500 px-8 py-2 text-white font-semibold text-xl rounded-md">Logout</button>
                        </>

                        :
                        <button className="border bg-cyan-600 px-8 py-2 text-white font-semibold text-xl rounded-md"><Link to="/login">Login</Link></button>
                }
                
            </div>
        </div>
    );
};

export default Navbar;