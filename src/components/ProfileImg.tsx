"use client"
import '../app/globals.css';
import { useGetProfileUser, useUpdateCover, useUpdateProfile } from '@/hooks/profile.hook';
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';
import fallbackImg from '../../images/default-fallback-image.png';
// import { useAppContext } from '@/contextApi';
import { useGetFollow } from '@/hooks/follow.hook';
import { CustomJwtPayload } from '@/jwtDecoder/jwtDecoder';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AddPostModal from './modal/AddPostModal';

type followingIds = {
    _id:string;
    name: string;
    profileImg:string;
    createdAt:string;
    updatedAt:string;
}
type followerIds = {
    _id:string;
    name: string;
    profileImg:string;
    createdAt:string;
    updatedAt:string;
}


export type TFollow = {
    id: followerIds;
    follow: followingIds;
};


const ProfileImg = ({userInfo} : {userInfo: CustomJwtPayload}) => {
    const [open, setOpen] = useState(false)
    const router = useRouter();
    const {data} = useGetFollow()
    // const [favorite, setFavourite] = useState(false);
    const {data:getProfileData, refetch} = useGetProfileUser()
    const {mutate:updateCoverPhoto} = useUpdateCover(refetch);
    const {mutate:updateProfilePhoto} = useUpdateProfile(refetch);
    // const {setOpen} = useAppContext()

    const userData = getProfileData?.data;

    const findFollowingData = data?.data?.filter((f:TFollow) => f?.follow?._id === userInfo?.id) as TFollow[]

    const findFollowerData = data?.data?.filter((f:TFollow) => f?.id?._id === userInfo?.id) as TFollow[]
    console.log(findFollowingData)

    
    const handleCoverImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const file = e.target.files![0] as any;
        const formData = new FormData();
        formData.append('coverImg', file);

        updateCoverPhoto(formData)

      };
    const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const file = e.target.files![0] as any;
        const formData = new FormData();
        formData.append('profileImg', file);

        updateProfilePhoto(formData)

      };


    const handleNavigate = (otherProfileId:string) => {
        if(userInfo?.id === otherProfileId){
            router.push('/profile')
        }else{
            router.push(`/profile/${otherProfileId}`)
        }
    }


    return (
        <div>
            <div className="w-[50%] bg-gray-200 mx-auto auto my-2 h-auto">
                <section className="w-full h-[400px] bg-gray-200 relative overflow: 'hidden'">
                    <div className='w-full h-[400px] overflow-hidden '>
                        <Image style={{width:'100%', height:'auto'}} width={1000} height={700} priority src={userData?.coverImg === 'add cover img' ? fallbackImg : userData?.coverImg || fallbackImg}  alt='cover-image'/>
                    </div>
                    <div className="w-[300px] h-[300px] rounded-full bg-gray-300 absolute left-[20px] bottom-[-70px] viewWithHover z-10 overflow-hidden ">
                        <Image className='absolute inset-x-10 inset-y-12 w-full h-full object-cover scale-150 ' style={{width:'100%', height:'auto'}} width={300} height={300} priority src={userData?.profileImg === ('add profile img') ? (fallbackImg) : userData?.profileImg || fallbackImg}  alt='profile-image'/>
                        <label  htmlFor="image">
                            <i className="uil uil-pen absolute bottom-[70px] right-[30px] hide cursor-pointer bg-gray-200 px-2 rounded-full text-blue-500"></i>
                        </label>
                        <input onChange={handleProfileImageChange} className='hidden' type="file" name="" id="image" />
                    </div>
                    <label htmlFor="coverImg">
                        <i className="uil uil-pen absolute bottom-[20px] right-[20px] cursor-pointer text-blue-500 bg-gray-200 px-2 hover:bg-gray-300 rounded-full"></i>
                    </label>
                    <input onChange={handleCoverImageChange} className='hidden' type="file" name="" id="coverImg" />
                </section>
                <section className='w-full mx-auto bg-green h-auto'>
                    <div className='w-[95%] h-auto mt-[100px] mx-auto  py-3'>
                        <div className='w-full h-[50px] py-2 flex items-center justify-between'>
                            <p className='text-2xl font-bold border-b-2 '>{userData?.name}
                            </p>
                            <div>
                                <p className='px-2 py-1 bg-blue-500 rounded text-white font-bold'>verify profile</p>
                            </div>
                        </div>
                        <hr />
                        <br />
                        
                        <p className='text-1xl font-bold  text-blue-400'>Following: {findFollowingData?.length}</p>
                        <br />
                        <div className='flex flex-wrap'>
                            {
                                findFollowingData?.map((item:TFollow, index:number) => {
                                    return (
                                        <div onClick={() =>handleNavigate(item?.id?._id)} key={index+1} className='w-[100px] h-[140px] bg-blue-400 mr-2 rounded overflow-hidden relative p-1 cursor-pointer'>
                                            <Image className='w-[100%] h-[100%] object-cover scale-150' width={200} height={200} src={item?.id?.profileImg || fallbackImg } alt='profile-img'/>
                                            <p title={item?.id?.name} className='absolute bottom-4 left-1 text-white text-sm bg-blue-500 rounded p-1 '>{item?.id?.name?.length > 11 ? item?.id?.name?.slice(0,9) + '..' : item?.id?.name }</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <br />
                        <br />
                        <p className='text-1xl font-bold  text-blue-400'>Followers: {findFollowerData?.length}</p>
                        <br />
                        <div className='flex flex-wrap'>
                            {
                                findFollowerData?.map((item:TFollow, index:number) => {
                                    return (
                                        <div  onClick={() =>handleNavigate(item?.follow?._id)} key={index+1} className='w-[100px] h-[140px] bg-blue-400 mr-2 rounded overflow-hidden relative p-1 cursor-pointer'>
                                            <Image className='w-[100%] h-[100%] object-cover scale-150' width={200} height={200} src={item?.follow?.profileImg || fallbackImg } alt='profile-img'/>
                                            <p title={item?.follow?.name} className='absolute bottom-4 left-1 bg-blue-500 p-1 rounded  text-white text-sm'>{item?.follow?.name?.length > 11 ? item?.follow?.name?.slice(0,9) + '..' : item?.follow?.name }</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <br />
                    
                        <div className='flex items-center justify-between w-full h-[50px]'>
                            <div className='w-[300px] h-[50px]'>
                                <Link href={`/profile`}>
                                    <button className='text-white font-bold px-2 py-1 bg-blue-500 rounded mr-2'>Your Posts</button>
                                </Link>
                                <Link href={`/profileForFavPosts`}>
                                    <button className='text-white font-bold px-2 py-1 bg-blue-500 rounded'>Favourite Posts</button>
                                </Link>
                            </div>
                            <div>
                                <p onClick={() => setOpen(true)} className='w-[130px] px-2 py-1 rounded bg-blue-500 font-bold text-white cursor-pointer'><i className="uil uil-plus"></i> Create Post</p>
                            </div>
                        </div>
                        <br /><br />
                    </div>
                </section>
            </div>
            <AddPostModal userInfo={userInfo} open={open} setOpen={setOpen}/>
        </div>
    );
};

export default ProfileImg;