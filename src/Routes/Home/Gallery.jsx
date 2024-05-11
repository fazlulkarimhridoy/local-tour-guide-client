import axios from "axios";
import { useEffect, useState } from "react";

const Gallery = () => {
    const [galleryData, setGalleryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get("https://local-tour-server.vercel.app/services")
            .then(res => {
                const data = res.data;
                setGalleryData(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            });
    }, []);

    return (
        <section>
            <div className="w-3/4 px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
                <header>
                    <h2 className="text-xl text-center font-bold text-cyan-600 sm:text-3xl">
                        Service Images
                    </h2>
                </header>
                {isLoading ? (
                    <div className="flex items-center justify-center py-5">
                        <progress className="progress w-56 h-5"></progress>
                    </div>
                ) : (
                    <ul className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3">
                        {galleryData.length > 0 &&
                            galleryData?.map(data =>
                                <li key={data._id}>
                                    <a className="block overflow-hidden group">
                                        <img
                                            src={data.ServiceImage}
                                            alt=""
                                            className="w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                                        />
                                    </a>
                                </li>).slice(1, 7)
                        }
                    </ul>
                )}
                {
                    galleryData.length === 0 &&
                    <div className="flex items-center justify-center mx-auto py-5">
                        <p className="text-red-600 text-2xl">Internal server error. Reload and try again later.</p>
                    </div>
                }
            </div>
        </section>
    );
};

export default Gallery;