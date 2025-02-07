"use client"

import { TPosts } from "@/types/posts.type";
import Image from "next/image";
import fallbackImg from '../../../images/default-fallback-image.png';
import { jwtDecoder } from "@/jwtDecoder/jwtDecoder";
import { useRouter } from "next/navigation";

const NewsFeedsProfile = ({item, token}: {item:TPosts, token:string}) => {

    const router = useRouter();

    const id = jwtDecoder(token);
  
    const handleNavigate = () => {
        console.log('hello')
        if(item?.userId?._id === id.id){
            router.push('/profile')
        }else{
            router.push(`/profile/${item?.userId?._id}`)
        }
    }

    return (
        <div onClick={handleNavigate} className="w-auto flex items-center font-bold cursor-pointer">
            <div  className="w-[35px] h-[35px] rounded-full bg-gray-300 overflow-hidden ">
                <Image className="scale-125 mt-2" width={200} height={200} src={item?.userId?.profileImg || fallbackImg} alt="" />
            </div>
            <div className="ml-3">
                <p>{item?.name}</p>
            </div>
        </div>
    );
};

export default NewsFeedsProfile;