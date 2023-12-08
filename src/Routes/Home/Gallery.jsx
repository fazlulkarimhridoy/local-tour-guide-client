import axios from "axios";
import {  useEffect, useState } from "react";

const Gallery = () => {
    const [galleryData, setGalleryData] = useState([]);
    useEffect(() => {
        axios.get("https://local-tour-server.vercel.app/services")
            .then(res => {
                const data = res.data;
                setGalleryData(data)
            })
    }, [])
    return (
        <section>
            <div className="w-3/4 px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
                <header>
                    <h2 className="text-xl text-center font-bold text-cyan-600 sm:text-3xl">
                        Service Images
                    </h2>
                </header>
                <ul className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        galleryData?.map(data =>
                            <li key={data._id}>
                                <a className="block overflow-hidden group">
                                    <img
                                        src={data.ServiceImage}
                                        alt=""
                                        className="w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                                    />
                                </a>
                            </li>).slice(4, 10)
                    }
                </ul>
            </div>
        </section>
    );
};

export default Gallery;