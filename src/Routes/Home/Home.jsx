import { Link } from "react-router-dom";
import Banner from "../../Components/Banner/Banner";
import HomeServices from "./HomeServices";
import Contact from "./Contact";
import Review from "./Review";
import Gallery from "./Gallery";
import { Helmet } from "react-helmet-async";
// import { useContext } from "react";
// import { AuthContext } from "../../Providers/AuthProvider";

const Home = () => {
    // const { loading } = useContext(AuthContext);
    // if (loading) {
    //     return <div className="flex justify-center pt-40">
    //         <progress className="progress w-56"></progress>
    //     </div>
    // }
    return (
        <div className="bg-gray-50">
            <Helmet>
                <title>Local Tours || Home</title>
            </Helmet>
            <Banner></Banner>
            <HomeServices></HomeServices>
            <div className="flex justify-center pb-6">
                <Link to="/services"><button type="button" className="self-start btn bg-cyan-600 text-white hover:bg-sky-400">View All Services</button></Link>
            </div>
            <Gallery></Gallery>
            <Review></Review>
            <Contact></Contact>
        </div>
    );
};

export default Home;