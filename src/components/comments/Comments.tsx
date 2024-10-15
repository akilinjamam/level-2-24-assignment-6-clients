"use client"
import { useState } from "react";
import SimpleTextEditor from "../simpleTextEditor/SimpleTextEditor";
import { useGetComments, usePostComments } from "@/hooks/comments.hook";
import { TPosts, TUser } from "@/types/posts.type";
import { jwtDecoder } from "@/jwtDecoder/jwtDecoder";
import Image from "next/image";
import fallbackPhoto from '../../../images/default-fallback-image.png';

export type TComments = {
    postId:TPosts;
    commenterId: TUser;
    comment: string;
}

const Comments = ({postId, commenterId}: {postId:string, commenterId:string}) => {
    const [hide, setHide] = useState(true);
    const [value, setValue] = useState('');

    const getId = jwtDecoder(commenterId);
    const id = getId.id;

    const {data:allComments, refetch} = useGetComments()
    const {mutate:createComments, error} = usePostComments(refetch);
    console.log(error);

    const filterCommentsAccordingToPosts = allComments?.data?.filter((f:TComments) => f?.postId?._id === postId)

    const handleComment = () => {
        const data = {
            postId,
            commenterId:id,
            comment: value
        }
        console.log(data)
        createComments(data);
    }


    return (
        <div className="h-auto">
            <div className="w-full flex items-center justify-center my-1">
                <div className="w-[99%] bg-gray-300 h-[30px] flex items-center justify-center">
                    <p onClick={() => setHide(!hide)} className="font-bold text-blue-500 cursor-pointer">Comments</p>
                </div>
            </div>
            <div className="w-full h-auto flex items-center justify-center my-1">
                <div className={`w-[99%] bg-gray-300 h-auto ${hide ? 'hidden' : 'block'} p-2`}>
                    {   filterCommentsAccordingToPosts?.length > 0
                        ?
                        filterCommentsAccordingToPosts?.map((item:TComments, index:number) => {
                            return (
                                <div className="mb-4" key={index+1}>
                                    <span className="font-bold text-sm flex items-center">
                                        <Image width={30} height={30} src={item?.commenterId?.profileImg || fallbackPhoto} alt='profile-pic'/>
                                        <p className="ml-2">{item?.commenterId?.name}</p>
                                    </span>
                                    <hr />
                                    <p className="text-sm" dangerouslySetInnerHTML={{__html:item?.comment}}></p>
                                </div>
                            )
                        })
                        :
                        <p className="text-sm font-bold italic">Add your first comment..</p>
                    }
                    <br />
                    <div className="w-full h-auto bg-gray-100">
                        <SimpleTextEditor setValue={setValue} value={value}/>
                    </div>
                    <div className="w-full h-[60px] flex items-center justify-end">
                        <button onClick={handleComment} className="bg-blue-500 px-3 py-1 font-bold text-white cursor-pointer">Post</button>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Comments;