"use client"
import { useCreateFavourite, useGetFavourite } from "@/hooks/favourite.hook";
import { jwtDecoder } from "@/jwtDecoder/jwtDecoder";
import { TPosts, TUser } from "@/types/posts.type";

export type TFavourite = {
    postId:TPosts;
    userId:TUser
}

const Favourite = ({postId, accessToken}: {postId:string, accessToken: string}) => {

    const getId = jwtDecoder(accessToken);
    const id = getId.id;

    
    const {data, refetch} = useGetFavourite();
    console.log(data)
    const findPostbyUsers = data?.data?.filter((f:TFavourite) => f?.postId?._id === postId);

    const findUserFromSpecificPost = findPostbyUsers?.find((f:TFavourite) => f?.userId?._id === id)

    const {mutate:createFavourite} = useCreateFavourite(refetch)

    const handleFavourite = () => {
        const data = {
            postId: postId,
            userId:id
        }
        createFavourite(data)
    }


    return (
        <div className="w-full flex items-center justify-center my-1">
                <div className="w-[99%] bg-gray-300 h-[30px] flex items-center justify-center">
                    <p onClick={handleFavourite} className={`font-bold ${(findUserFromSpecificPost?.userId?._id === id) ? 'text-red-500': 'text-blue-500' } cursor-pointer`}>Favourite</p>
                </div>
            </div>
    );
};

export default Favourite;