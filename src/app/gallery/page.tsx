"use client"

import LightGalleryImage from "@/components/LightGallery";
import { useGetAllPost } from "@/hooks/posts.hook";
import { TPosts } from "@/types/posts.type";

const Gallery = () => {

    const {data:allImgData} = useGetAllPost();


    return (
        <div className="lg:w-[50%] md:w-[70%] sm:w-[98%] xsm:w-[99%] mx-auto bg-gray-200">
            {
                allImgData?.data?.map((item:TPosts, index:number) => {
                    return (
                        <div key={index+1}>
                            <LightGalleryImage item={item} />
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Gallery;