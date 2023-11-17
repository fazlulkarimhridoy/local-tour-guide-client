import { Link } from "react-router-dom";
import Banner from "../../Components/Banner/Banner";
import HomeServices from "./HomeServices";
import Contact from "./Contact";
import Review from "./Review";
import Gallery from "./Gallery";

const Home = () => {
    return (
        <div className="bg-gray-50">
            <Banner></Banner>
            <HomeServices></HomeServices>
            <div className="flex justify-center pb-6">
                <Link to="/services"><button type="button" className="self-start btn bg-cyan-600 text-white hover:bg-sky-400">View Details</button></Link>
            </div>
            <Gallery></Gallery>
            <Review></Review>
            <Contact></Contact>
        </div>
    );
};

export default Home;