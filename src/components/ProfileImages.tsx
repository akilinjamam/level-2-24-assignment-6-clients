"use client"
import '../app/globals.css';
import { useGetProfileUser, useUpdateCover, useUpdateProfile } from '@/hooks/profile.hook';
import Image from 'next/image';
import React, { ChangeEvent } from 'react';
import fallbackImg from '../../images/default-fallback-image.png';

const ProfileImages = () => {

    const {data:getProfileData, refetch} = useGetProfileUser()
    const {mutate:updateCoverPhoto} = useUpdateCover(refetch);
    const {mutate:updateProfilePhoto} = useUpdateProfile(refetch);


    const userData = getProfileData?.data;

    
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


    return (
        <div>
            <section className="w-full h-[400px] bg-gray-200 relative overflow: 'hidden'">
            <div className='w-full h-[400px] overflow-hidden '>
                <Image style={{width:'100%', height:'auto'}} width={1000} height={700} priority src={userData?.coverImg || fallbackImg}  alt='cover-image'/>
            </div>
            <div className="w-[300px] h-[300px] rounded-full bg-gray-300 absolute left-[20px] bottom-[-70px] viewWithHover z-10 overflow-hidden ">
                <Image className='absolute inset-x-10 inset-y-12 w-full h-full object-cover scale-150 ' style={{width:'100%', height:'auto'}} width={300} height={300} priority src={userData?.profileImg || fallbackImg}  alt='cover-image'/>
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
            <section className="w-full h-[300px] relative">
                <div className='w-[95%] h-[200px] absolute bottom-0 left-[2.5%] p-2'>
                <   p className='text-2xl font-bold'>{userData?.name}</p>
                </div>
            </section>
        </div>
    );
};

export default ProfileImages;