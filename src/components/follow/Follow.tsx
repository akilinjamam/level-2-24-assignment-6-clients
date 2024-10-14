"use client";

// import { useState } from "react";

import { useCreateFollow, useGetFollow, useRemoveFollow } from "@/hooks/follow.hook";
import { jwtDecoder } from "@/jwtDecoder/jwtDecoder";

export type TUser = {
    _id:string;
    name: string;
    email: string;
    password: string;
    role?: 'user' | 'admin';
    profileImg?: string;
    coverImg?: string;
    verified?: boolean;
    premium?: boolean;
  };

export type TFollower = {
    id: TUser;
    follow: TUser;
  };

const Follow = ({myId, followingId} : {myId:string, followingId: string}) => {
   
    const getToken = jwtDecoder(myId);
    const id = getToken?.id;
    
    const {data, refetch} = useGetFollow();
    const { mutate: createFollow } = useCreateFollow(refetch);
    const {mutate: deleteFollow} = useRemoveFollow(refetch)
    
    const handleFollow = () => {
        const data = {
            id: followingId,
            follow: id
        };
        createFollow(data);
    };

    const handleUnfollow = () => {
        const data = {
            myId: id,
            followerId: followingId,
        };
        deleteFollow(data)
    }

    
    const findFollowings = data?.data?.filter((f:TFollower) => f?.id?._id === followingId) as TFollower[];

    const findMyIdFromFollower = findFollowings?.find((f:TFollower) => f?.follow?._id === id)

    
    
    console.log(findMyIdFromFollower);

    return (
        <div>
            {
                followingId !== id 
                &&
                <div className="bg-gray-300 px-2 py-1 font-bold text-blue-500 cursor-pointer">
                    <i className="uil uil-plus"></i>
                    <span>{(findMyIdFromFollower?.id?._id === followingId) ? <span onClick={handleUnfollow}>Unfollow</span> : <span onClick={handleFollow}>Follow</span> }</span>
                </div>
            }
        </div>
    );
};

export default Follow;
