import { Link } from "react-router-dom";
import Banner from "../../Components/Banner/Banner";
import HomeServices from "./HomeServices";

const Home = () => {
    return (
        <div className="bg-gray-50">
            <Banner></Banner>
            <HomeServices></HomeServices>
            <div className="flex justify-center">
                <Link to="/services"><button type="button" className="self-start btn bg-cyan-600 text-white hover:bg-sky-400">View Details</button></Link>
            </div>
        </div>
    );
};

export default Home;