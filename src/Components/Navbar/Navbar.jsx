import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    // nav links
    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/services">Services</NavLink></li>
        <li><NavLink to="/addServices">Add Services</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
        <li><NavLink to="/register">Register</NavLink></li>
        <li></li>
    </>

    return (
        <div className="container mx-auto navbar bg-gray-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <img className="rounded-full w-1/5" src="https://i.ibb.co/mD8wJc4/Screenshot-406.png" alt="" />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-x-3">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                <p className="border bg-cyan-400 px-8 py-2 text-white font-bold rounded-md"><Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Navbar;