"use client"

import { useCreateDownvote, useGetDownVote, useGetUpvote, usePostUpvote } from "@/hooks/upAndDownVote.hook";
import { jwtDecoder } from "@/jwtDecoder/jwtDecoder";
import { TPosts, TUser } from "@/types/posts.type";

export type TUpvote = {
    id:TPosts;
    upvote:TUser;
}

export type TDownvote = {
    id:TPosts;
    downvote:TUser;
}

const UpAndDownVote = ({postId, accessToken}: {postId:string, accessToken:string}) => {

    const getToken = jwtDecoder(accessToken);
    const id = getToken?.id;

    const {data:getUpvoteData, refetch:refetchUpvote} = useGetUpvote();
    const {data:getDownvoteData, refetch:refetchDownvote} = useGetDownVote();

    const {mutate:postUpvoteData, error} = usePostUpvote(refetchUpvote, refetchDownvote);
    const {mutate:postDownvoteData} = useCreateDownvote(refetchDownvote, refetchUpvote);

    const findUpvotesAccordingToPost = getUpvoteData?.data?.filter((f:TUpvote) => f?.id?._id === postId);

    const findDownvotesAccordingToPost = getDownvoteData?.data?.filter((f:TUpvote) => f?.id?._id === postId);

    console.log(error)


    const handleUpvote = () => {
        const data = {
            id: postId,
            upvote: id
        };
        postUpvoteData(data)
    }
    const handleDownvote = () => {
        const data = {
            id: postId,
            downvote: id
        };
        postDownvoteData(data)
    }


    return (
        <div className="w-full h-[30px] px-1 flex items-center justify-between font-bold text-blue-500">
            <div className="bg-gray-300 w-[49.5%] h-[30px] flex items-center justify-center ">
                <p onClick={handleUpvote} className="cursor-pointer">Up Vote {findUpvotesAccordingToPost?.length > 0 ? `(${findUpvotesAccordingToPost?.length})` : ''}</p>
            </div>
            <div className="bg-gray-300 w-[50%] h-[30px] flex items-center justify-center cursor-pointer">
                <p onClick={handleDownvote} className="cursor-pointer">Down Vote {findDownvotesAccordingToPost?.length > 0 ? `(${findDownvotesAccordingToPost?.length})` : ''}</p>
            </div>
        </div>
    );
};

export default UpAndDownVote;