"use server";  

import { TPosts } from "@/types/posts.type";
import { cookies } from "next/headers";
import Image from "next/image";
import fallbackImg from '../../images/default-fallback-image.png';
import LightGalleryImage from "@/components/LightGallery";
import Follow from "@/components/follow/Follow";

const Home = async () => {

    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value as string;

    const getPosts = async () => {
        const url = `${process.env.NEXT_PUBLIC_BASE_API}/api/posts/`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${accessToken}`,
                },
                cache: 'no-store',
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const data = await getPosts();

    return (
        <div className="w-full min-h-[1200px] my-2">
            <div className="w-[50%] min-h-[1200px] bg-gray-100 mx-auto p-2">
                {data?.data?.map((item: TPosts, index: number) => (
                    <div className="bg-gray-200 mb-3" key={index + 1}>
                        <div className="w-full h-[50px] flex items-center justify-between px-2">
                            <div className="w-[200px] flex items-center font-bold">
                                <div className="w-[35px] h-[35px] rounded-full bg-gray-300 overflow-hidden">
                                    <Image className="scale-125 mt-2" width={200} height={200} src={item?.userId?.profileImg || fallbackImg} alt="" />
                                </div>
                                <div className="ml-3">
                                    <p>{item?.name}</p>
                                </div>
                            </div>
                            <Follow myId={accessToken} followingId={item?.userId?._id}/>
                        </div>

                        {/* Image section */}
                        <div className="w-full h-auto">
                            <LightGalleryImage item={item} />
                        </div>
                        <br />

                        {/* Title */}
                        <div className="w-full ml-1">
                            <p className="font-bold">{item?.title}</p>
                        </div>
                        <br />

                        {/* Description */}
                        <div className="w-full ml-1">
                            <div dangerouslySetInnerHTML={{ __html:item?.description  }} />
                            
                        </div>
                        <br />

                        <div className="w-full h-[30px] px-1 flex items-center justify-between font-bold text-blue-500">
                            <div className="bg-gray-300 w-[49.5%] h-[30px] flex items-center justify-center">
                                <p>Up Vote</p>
                            </div>
                            <div className="bg-gray-300 w-[50%] h-[30px] flex items-center justify-center">
                                <p>Down Vote</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
