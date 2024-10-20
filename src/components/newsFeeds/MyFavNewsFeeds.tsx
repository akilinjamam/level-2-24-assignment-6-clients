"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Follow from "../follow/Follow";
import LightGalleryImage from "../LightGallery";
import fallbackImg from './../../../images/default-fallback-image.png';
import UpAndDownVote from "../upAndDownVote/UpAndDownVote";
import Favourite, { TFavourite } from "../favourite/Favourite";
import Comments from "../comments/Comments";

const MyFavNewsFeeds = ({data, accessToken}: {data:any, accessToken:string}) => {
    return (
        <div className="lg:w-[50%] md:w-[70%] sm:w-[98%] xsm:w-[99%] md profileForFavPosts mx-auto h-auto my-2">
            <div className="w-[100%] h-auto bg-gray-100 mx-auto p-2">
                {data?.map((item: TFavourite, index: number) => (
                    <div className="bg-gray-200 mb-3" key={index + 1}>
                        <div className="w-full h-[50px] flex items-center justify-between px-2">
                            <div className="w-auto flex items-center font-bold">
                                <div className="w-[35px] h-[35px] rounded-full bg-gray-300 overflow-hidden">
                                    <Image className="scale-125 mt-2" width={200} height={200} src={item?.userId?.profileImg || fallbackImg} alt="" />
                                </div>
                                <div className="ml-3">
                                    <p>{item?.postId?.name}</p>
                                </div>
                            </div>
                            <Follow myId={accessToken} followingId={item?.userId?._id}/>
                        </div>

                        {/* Image section */}
                        <div className="w-full h-auto">
                            <LightGalleryImage item={item?.postId} />
                        </div>
                        <br />

                        {/* Title */}
                        <div className="w-full ml-1">
                            <p className="font-bold">{item?.postId?.title}</p>
                        </div>
                        <br />

                        {/* Description */}
                        <div className="w-full ml-1">
                            <div dangerouslySetInnerHTML={{ __html:item?.postId?.description  }} />
                            
                        </div>
                        <br />

                        <UpAndDownVote accessToken={accessToken} postId={item?.postId?._id}/>
                        <Favourite postId={item?.postId?._id} accessToken={accessToken}/>
                        <Comments commenterId={accessToken} postId={item?.postId?._id}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyFavNewsFeeds;