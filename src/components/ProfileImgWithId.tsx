/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import '../app/globals.css';
import { useGetOtherProfileUser} from '@/hooks/profile.hook';
import Image from 'next/image';
import fallbackImg from '../../images/default-fallback-image.png';
// import { useAppContext } from '@/contextApi';
import { useGetFollow } from '@/hooks/follow.hook';
import { useRouter } from 'next/navigation';
import { jwtDecoder } from '@/jwtDecoder/jwtDecoder';


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


const ProfileImgWithId = ({userInfo, myToken} : {userInfo: any, myToken:string}) => {

    const router = useRouter()

    const {data} = useGetFollow()
   
    const {data:getProfileData} = useGetOtherProfileUser(userInfo)
    console.log(userInfo)
    
    const getId = jwtDecoder(myToken);
    const myId = getId?.id

    const userData = getProfileData?.data;

    const findFollowingData = data?.data?.filter((f:TFollow) => f?.follow?._id === userInfo.toString()) as TFollow[]

    const findFollowerData = data?.data?.filter((f:TFollow) => f?.id?._id === userInfo.toString()) as TFollow[]
    
    const handleNavigate = (otherProfileId:string) => {
        console.log(otherProfileId)
        console.log(userInfo)
        if(myId === otherProfileId){
            router.push('/profile')
        }else{
            router.push(`/profile/${otherProfileId}`)
        }
    }

    return (
        <div className="w-[50%] bg-gray-200 mx-auto auto my-2 h-auto">
            <section className="w-full h-[400px] bg-gray-200 relative overflow: 'hidden'">
                <div className='w-full h-[400px] overflow-hidden '>
                    <Image style={{width:'100%', height:'auto'}} width={1000} height={700} priority src={userData?.coverImg === 'add cover img' ? fallbackImg : userData?.coverImg || fallbackImg}  alt='cover-image'/>
                </div>
                <div className="w-[150px] h-[150px]  bg-gray-300 absolute left-[20px] bottom-[-70px] z-10 overflow-hidden flex items-center justify-center rounded-full ">
                    <Image className='w-full h-full object-cover' style={{width:'100%', height:'auto'}} width={300} height={300} priority src={userData?.profileImg === ('add profile img') ? (fallbackImg) : userData?.profileImg || fallbackImg}  alt='profile-image'/>
                    
                </div>
                
            </section>
            <section className='w-full mx-auto bg-green h-auto'>
                <div className='w-[95%] h-auto mt-[100px] mx-auto'>
                    <p className='text-2xl font-bold border-b-2 border-gray-500 py-3'>{userData?.name}</p>
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
                                    <div onClick={() =>handleNavigate(item?.follow?._id)} key={index+1} className='w-[100px] h-[140px] bg-blue-400 mr-2 rounded overflow-hidden relative p-1 cursor-pointer'>
                                        <Image className='w-[100%] h-[100%] object-cover scale-150' width={200} height={200} src={item?.follow?.profileImg || fallbackImg } alt='profile-img'/>
                                        <p title={item?.follow?.name} className='absolute bottom-4 left-1 bg-blue-500 p-1 rounded  text-white text-sm'>{item?.follow?.name?.length > 11 ? item?.follow?.name?.slice(0,9) + '..' : item?.follow?.name }</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <br />
                    <br /><br />
                </div>
            </section>
        </div>
    );
};

export default ProfileImgWithId;