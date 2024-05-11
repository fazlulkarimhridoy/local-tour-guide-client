import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import swal from 'sweetalert';
import logo from "../../assets/tourguidlogo.png"
import { FaSignInAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";

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
        <li className="text-cyan-600"><NavLink to="/">Home</NavLink></li>
        <li className="text-cyan-600"><NavLink to="/services">Services</NavLink></li>
        {
            user ?
                <li className="text-cyan-600">
                    <div className="dropdown dropdown-bottom">
                        <label tabIndex={0}>Dashboard</label>
                        <ul tabIndex={0} className="dropdown-content z-[1] w-36 mt-2 py-3 pl-0 rounded bg-gray-100">
                            <li className="border-2 border-gray-100 hover:border-2 hover:rounded hover:border-black hover:transition-all hover:duration-200 hover:bg-cyan-50 w-full font-semibold"><Link to="/myServices">My-services</Link></li>
                            <li className="border-2 border-gray-100 hover:border-2 hover:rounded hover:border-black hover:transition-all hover:duration-200 hover:bg-cyan-50 w-full font-semibold"><Link to="/addServices">Add-services</Link></li>
                            <li className="border-2 border-gray-100 hover:border-2 hover:rounded hover:border-black hover:transition-all hover:duration-200 hover:bg-cyan-50 w-full font-semibold"><Link to="/myBookings">My-schedules</Link></li>
                        </ul>
                    </div>
                </li> : ""
        }

        {
            user ?
                "" :
                <>
                    <li className="text-cyan-600"><NavLink to="/login">Login</NavLink></li>
                    <li className="text-cyan-600"><NavLink to="/register">Register</NavLink></li>
                </>

        }
    </>
    return (
        <div className="navbar bg-gray-200">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="lg:hidden">
                    <Link to="/"><img className="pl-4 rounded-full w-3/5" src={logo} /></Link>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <Link to="/"><img className="pl-4 rounded-full w-1/5 hidden md:flex" src={logo} /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-x-3 rounded-none">
                    {links}
                </ul>
            </div>
            <div className="navbar-end md:pr-4">
                {
                    user ?
                        <>
                            <div className="flex justify-center mr-3 items-center py-1 px-2">
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0}>
                                        <button>
                                            <img className="w-12 h-12 border border-cyan-600 rounded-3xl bg-gray-500" src={user?.photoURL} />
                                        </button>
                                    </label>
                                    <ul tabIndex={0} className="bg-gray-100 border-y border-x border-y-black border-x-gray-200 dropdown-content mt-2 z-[1] w-[200px] py-3 rounded">
                                        <li className="flex justify-center items-center gap-3 text-base py-2 px-3 border-2 border-gray-100 hover:border-2 hover:rounded hover:border-black hover:transition-all hover:duration-200 hover:bg-gray-200 w-full font-semibold text-gray-600">
                                            <FaRegUser></FaRegUser> {user?.displayName}
                                        </li>
                                        <li className="mt-2">
                                            <button onClick={handleLogout} className="flex text-center items-center justify-center gap-3 border-2 border-gray-100 hover:border-2 hover:rounded hover:border-black hover:transition-all hover:duration-200 hover:bg-red-100 w-full py-2 font-semibold text-red-600 text-lg">
                                                <FaSignInAlt></FaSignInAlt> Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </>

                        :
                        <button className="border bg-cyan-600 px-6 py-2 text-white font-medium text-lg rounded-xl"><Link to="/login">Sign in</Link></button>
                }

            </div>
        </div>
    );
};

export default Navbar;