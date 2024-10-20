"use client"
import {  jwtDecoder } from "@/jwtDecoder/jwtDecoder";
import { TFollow } from "../ProfileImg";
import { useGetFollow } from "@/hooks/follow.hook";
import { useGetProfileUser } from "@/hooks/profile.hook";
import { useGetAllPost } from "@/hooks/posts.hook";
import { TPosts } from "@/types/posts.type";
import Image from "next/image";
import UpAndDownVote from "../upAndDownVote/UpAndDownVote";
import Comments from "../comments/Comments";
import { useState } from "react";
import AddPostModalForDashbord from "../modal/AddPostModalForDashbord";
import Link from "next/link";

const UserAllPost = ({token}: {token:string}) => {
    const [open, setOpen] = useState(false);
    const getToken = jwtDecoder(token);
    const [hide, setHide] = useState(true);

    const {data} = useGetFollow()
    const {data:profileUser} = useGetProfileUser()
    const {data:allPosts} = useGetAllPost();
    
    const allPostFilteredById = allPosts?.data?.filter((f:TPosts) => f?.userId?._id === getToken?.id)
    console.log(allPostFilteredById)
    
    const findFollowingData = data?.data?.filter((f:TFollow) => f?.follow?._id === getToken.id) as TFollow[]

    const findFollowerData = data?.data?.filter((f:TFollow) => f?.id?._id === getToken?.id?.toString()) as TFollow[]
    

    return (
        <div>
            <div style={{borderBottom: '1px solid black'}} className="w-full h-[50px] flex items-center justify-between">
                <p className="font-bold ">All Posts: {profileUser?.data?.name}</p>
                <span className="font-bold"><span>Following: {findFollowingData?.length}</span> <span>Follower: {findFollowerData?.length}</span></span>
            </div>
            <br />
            <div className="w-full h-[20px] flex items-center justify-between">
                <div>
                    <p onClick={() => setOpen(true)} className='w-[130px] px-2 py-1 rounded bg-blue-500 font-bold text-white cursor-pointer'><i className="uil uil-plus"></i> Create Post</p>
                </div>
                <div className="relative">
                    <i onClick={() => setHide(!hide)} className="uil uil-bars cursor-pointer lg:hidden md:hidden sm:block xsm:block"></i>
                    <div className={`w-[300px] bg-gray-300 ${hide ? 'hidden' : 'absolute'} top-10 right-0 p-3`}>
                        <Link href="/userDashboard" className='font-bold cursor-pointer'><i className="uil uil-document-layout-right"></i> My Posts</Link>
                        <br />
                        <br />
                       
                    </div>
                </div>
            </div>
            <br />
            <div className="w-full h-[70vh] overflow-x-hidden overflow-y-scroll">
                <div>
                    {
                        allPostFilteredById?.map((item:TPosts, index:number) => {
                            return (
                                <div  key={index+1}  className="bg-gray-100 mb-2 p-2">
                                    <div>
                                        <p className="font-bold">Title: {item?.title}</p>
                                    </div>
                                    <br />
                                    <div>
                                        <p className="font-bold">Category: {item?.category}</p>
                                    </div>
                                    <br />
                                    <div className="flex flex-wrap mb-3">
                                        {
                                            item?.images?.map((image:string, index:number) => {
                                                return (
                                                    <Image className="mr-2" width={500} height={500} key={index+1} src={image} alt=""/>
                                                )
                                            })
                                        }    
                                    </div> 
                                    <br />
                                    <div dangerouslySetInnerHTML={{__html: item?.description}}>

                                    </div>
                                    <br />
                                    <div>
                                        <UpAndDownVote postId={item?._id}  accessToken={token}/>
                                    </div>
                                    
                                    <div>
                                        <Comments postId={item?._id} commenterId={token}/>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <AddPostModalForDashbord userInfo={getToken} open={open} setOpen={setOpen}/>
        </div>
    );
};

export default UserAllPost;