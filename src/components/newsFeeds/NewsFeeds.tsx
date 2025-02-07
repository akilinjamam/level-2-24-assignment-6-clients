"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { TPosts } from "@/types/posts.type";
import Follow from "../follow/Follow";
import LightGalleryImage from "../LightGallery";

import UpAndDownVote from "../upAndDownVote/UpAndDownVote";
import Comments from "../comments/Comments";
import Favourite from "../favourite/Favourite";
import NewsFeedsProfile from "../newFeedsProfile/NewsFeedsProfile";
import Link from "next/link";
import SocialShare from "../socialShare/SocialShare";

const NewsFeeds = ({data, accessToken}: {data:any, accessToken:string}) => {
    return (
        <div className="w-full min-h-auto my-2">
            <div className="lg:w-[50%] md:w-[80%] sm:w-[98%] xsm:w-[99%] min-h-auto bg-gray-100 mx-auto p-2">
                {data?.data?.map((item: TPosts, index: number) => (
                    <div className="bg-gray-200 mb-3" key={index + 1}>
                        <div className="w-full h-[50px] flex items-center justify-between px-2">
                            <NewsFeedsProfile item={item} token={accessToken} />
                            <Follow myId={accessToken} followingId={item?.userId?._id}/>
                        </div>
                        {item?.premium === true && <p className="text-orange-500 ml-2 py-3 font-bold text-2xl">Premium</p> }
                        {/* Image section */}
                        <div className="w-full h-auto">
                            <LightGalleryImage item={item} />
                        </div>
                        <br />

                        {/* category */}
                        <div className="w-full ml-1 text-xl text-green-500">
                            <p className="font-bold">Category: {item?.category}</p>
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
                        <div className="w-full h-[30px] flex items-center justify-between px-2">
                            <div className="bg-blue-500 text-white font-bold px-2 py-1 my-2">
                                <Link href={`/pdf/${item?._id}`}><p>Generate PDF</p></Link>
                            </div>
                            <div>
                                <SocialShare postId={item?._id}/>
                            </div>
                        </div>
                        <br />
                        <UpAndDownVote postId={item?._id} accessToken={accessToken}/>
                        <Favourite postId={item?._id} accessToken={accessToken}/>
                        <Comments commenterId={accessToken} postId={item?._id}/>
                        <br />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsFeeds;