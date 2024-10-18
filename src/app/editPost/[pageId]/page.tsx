"use client"
import EditPost from '@/components/post/EditPost';
import { useGetAllPost } from '@/hooks/posts.hook';
import { TPosts } from '@/types/posts.type';
/* eslint-disable @typescript-eslint/no-explicit-any */


const EditPosts = ({params}: {params:any}) => {

    const id = params?.pageId
    console.log(id)
    const {data:allPostData, refetch} = useGetAllPost();

    const findPost = allPostData?.data?.find((f:TPosts) => f?._id === id) as TPosts

    
    return (
        <div className='w-[50%] mx-auto bg-gray-200 p-2 my-2'>
           <EditPost userInfo={findPost?.userId} postInfo={findPost} refetch={refetch}/>
        </div>
    );
};

export default EditPosts;