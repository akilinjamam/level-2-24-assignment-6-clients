"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { TPosts } from "@/types/posts.type";
import Image from "next/image";
import Follow from "../follow/Follow";
import LightGalleryImage from "../LightGallery";
import fallbackImg from './../../../images/default-fallback-image.png';
import UpAndDownVote from "../upAndDownVote/UpAndDownVote";
import Comments from "../comments/Comments";

const NewsFeeds = ({data, accessToken}: {data:any, accessToken:string}) => {
    return (
        <div className="w-full min-h-[1200px] my-2">
            <div className="w-[50%] min-h-[1200px] bg-gray-100 mx-auto p-2">
                {data?.data?.map((item: TPosts, index: number) => (
                    <div className="bg-gray-200 mb-3" key={index + 1}>
                        <div className="w-full h-[50px] flex items-center justify-between px-2">
                            <div className="w-auto flex items-center font-bold">
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
                        <UpAndDownVote postId={item?._id} accessToken={accessToken}/>
                        <Comments commenterId={accessToken} postId={item?._id}/>
                        <br />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsFeeds;