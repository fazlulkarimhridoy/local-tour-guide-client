import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex items-center p-16 text-gray-800">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <img className="rounded-full" src="https://i.ibb.co/Z2vQR4C/360-F-388638369-w-SBADh-Kfhi-Tx6-Q5-Pz1xfdpy6zotku1-Sg.jpg" alt="" />
                    <p className="text-2xl font-semibold md:text-3xl">Sorry, we could not find this page.</p>
                    <p className="mt-4 mb-8 text-gray-600">But do not worry, you can find plenty of other things on our homepage.</p>
                    <Link to="/"><button className="px-8 py-3 font-semibold rounded bg-cyan-600 text-gray-50">Back to Home Page</button></Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;