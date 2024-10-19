"use client"

import { useDeletePosts, useGetAllPost } from "@/hooks/posts.hook";

const DeletePost = ({postId}: {postId:string}) => {

    const {data, refetch} = useGetAllPost()
    const {mutate:deletePostData} = useDeletePosts(refetch)

    console.log(data)

    const handleDeletePost = () => {
        deletePostData(postId)
    }


    return (
        <p onClick={ handleDeletePost} className="w-[65px]  px-2 py-1 mx-3 rounded bg-blue-500 text-white font-bold cursor-pointer">Delete</p>
    );
};

export default DeletePost;