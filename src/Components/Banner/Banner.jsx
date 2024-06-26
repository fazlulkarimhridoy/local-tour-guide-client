import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
    return (
        <section className="bg-gray-50">
            <div
                className="mx-auto max-w-screen-xl px-4 py-5 md:py-20 lg:py-32 lg:flex lg:items-center"
            >
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        A local tour guide.
                        <strong className="font-extrabold text-cyan-700 sm:block">
                            <Typewriter
                                words={['Featuring tours & more']}
                                cursor
                                cursorStyle='.'
                            ></Typewriter>
                        </strong>
                    </h1>

                    <p className="mt-4 sm:text-xl/relaxed">
                        Anyone can provide services in our website as well as he can book others services and make schedules for him. Best services are provided our website using different mindsets and more
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <button className="block w-full rounded bg-cyan-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-cyan-700 focus:outline-none focus:ring active:bg-cyan-500 sm:w-auto">
                            <Link to="/services">Book Now</Link>
                        </button>

                        <button className="block w-full rounded px-12 py-3 text-sm font-medium text-cyan-600 shadow hover:text-cyan-700 focus:outline-none focus:ring active:text-cyan-500 sm:w-auto">
                            <Link to="/services">Click to learn more..</Link>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;