"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useState } from "react";
import { useGetProfileUser } from "@/hooks/profile.hook";
import Image from "next/image";
import fallbackImg from '../../../images/default-fallback-image.png';
import { homeRoutes, THomeRoutes } from "../homeRoutes";
import { CustomJwtPayload } from "@/jwtDecoder/jwtDecoder";
import { logout } from "@/service/authService";

const NavItems = ({userInfo}: {userInfo:CustomJwtPayload}) => {
    const router = useRouter();
   
    const {data:getProfilePicture} = useGetProfileUser();
    const userData = getProfilePicture?.data;
    
    const [inputValue, setInputValue] = useState('');
    

   const [hide, setHide] = useState(true);

    const pathName = usePathname();

    const activeDash = (linkValue: string) => {
        return (pathName === linkValue) ? 'text-blue-500 font-bold' : '' 
       }
  
    return (
        <div onClick={() => {
            setHide(true)
        }} className="w-full h-[50px] bg-gray-100 flex items-center justify-between ">
            <div className="lg:w-[24.5%] md:w-[40%] sm:w-[50%] xsm:w-[70%]  h-full p-2 flex items-center justify-end relative ">
                <div className="w-[30px] h-[30px] rounded-full bg-blue-500 text-white font-bold flex items-center justify-center mr-5">G</div>
                <input value={inputValue} className="w-3/5 rounded-full px-8 text-sm h-[80%]" type="text" name="" id="" onChange={(e) => setInputValue(e.target.value)}/>

                <i className="uil uil-search absolute top-[13px] left-16"></i>
                <Link href={`/?searchTerm=${inputValue}`}>
                    <button className="px-2 py-1 bg-blue-500 rounded text-white font-bold ml-2">
                        search
                    </button>
                </Link>
                <Link href={`/?searchTerm=`}>
                    <button onClick={() => setInputValue('')} className="px-2 py-1 bg-blue-500 rounded text-white font-bold ml-2">
                        clear
                    </button>
                </Link>
            </div>
           <div className="w-[50%] xsm:hidden sm:hidden md:flex  h-full lg:flex lg:items-center lg:justify-around">
                {
                    homeRoutes?.slice(0,4)?.map((item: THomeRoutes, index: number) => {
                       const active = (linkValue: string) => {
                        return (pathName === linkValue) ? 'border-b-2 border-blue-500' : '' 
                       }
                        return (
                            <div  key={index + 1} className={`w-[50%] h-full flex items-center justify-around ${active(item?.links)}`}>
                                <Link  href={item.links}>
                                    <i title={item?.name} className={`${item?.icons} text-2xl w-[24%] text-center cursor-pointer`}></i>
                                </Link>
                            </div>
                        )
                    })
                }
           </div>
            <div className="w-[24.5%] h-full flex items-center justify-end px-2 relative">
                <div onClick={(e) => {
                    setHide(!hide)
                    e.stopPropagation()
                }} className="w-[40px] h-[40px] bg-gray-200 rounded-full cursor-pointer overflow-hidden ">
                    <Image className="object-cover scale-150 mt-1" style={{width:'50px', height:'40px'}} width={500} height={500} priority src={userInfo?.profileImg === 'add profile img' ? fallbackImg : userInfo?.profileImg || fallbackImg}  alt='cover-image'/>
                    
                </div>
                <div>
                    <p className="absolute top-[15px] right-[55px] text-sm text-blue-500 font-bold">{userData?.verified === 'true' && 'verified' }</p>
                </div>
                
                <div className={`w-[200px] h-auto bg-gray-100 top-[60px] right-0 ${hide ? 'hidden' : 'absolute'} p-2 text-sm`}>
                    <ul >
                        <p className="font-bold">{userInfo?.name}</p>
                        <hr />
                        <br />
                        {
                            homeRoutes?.slice(4)?.map((item: THomeRoutes, index:number) => {
                                const active = (linkValue: string) => {
                                    return (pathName === linkValue) ? 'text-blue-500 font-bold' : '' 
                                   }
                                return (
                                    <Link onClick={(e) => e.stopPropagation()} key={index+1} href={item?.links}>
                                        <li className={`mb-2 ${active(item?.links)}`}>
                                            <i className={item?.icons}></i> {item?.name}
                                        </li>
                                    </Link>
                                )
                            })
                        }
                        {
                            userInfo?.role === 'user'
                            &&
                            <Link onClick={(e) => e.stopPropagation()} href="/userDashboard">
                            <li className={`mb-2 ${activeDash('/userDashboard')}`}>
                                <i className='uil uil-create-dashboard'></i> User Dashboard
                            </li>
                            </Link>
                        }
                        {
                            userInfo?.role === 'admin'
                            &&
                            <Link onClick={(e) => e.stopPropagation()} href="/adminDashboard">
                            <li className={`mb-2 ${activeDash('/adminDashboard')}`}>
                                <i className='uil uil-dashboard'></i> Admin Dashboard
                            </li>
                            </Link>
                        }
                        <p onClick={(e) => {
                            e.stopPropagation()
                            logout()
                            router.push('/login')
                        }} >
                            <li className={`mb-2 cursor-pointer ${activeDash('/adminDashboard')}`}>
                                <i className='uil uil-signout cursor-pointer'></i> Logout
                            </li>
                        </p>
                    </ul>
   
                </div>
                <div className={`w-[200px] h-auto bg-gray-100 top-[60px] right-0 ${hide ? 'hidden' : 'xsm:absolute sm:absolute md:hidden lg:hidden'} p-2 text-sm`}>
                    <ul >
                    <p className="font-bold">{userData?.name}</p>
                        <hr />
                        <br />
                        {
                            homeRoutes?.map((item: THomeRoutes, index:number) => {
                                const active = (linkValue: string) => {
                                    return (pathName === linkValue) ? 'text-blue-500 font-bold' : '' 
                                   }
                                return (
                                    <Link onClick={(e) => e.stopPropagation()} key={index+1} href={item?.links}>
                                        <li className={`mb-2 ${active(item?.links)}`}>
                                            <i className={item?.icons}></i> {item?.name}
                                        </li>
                                    </Link>
                                )
                            })
                        }
                        {
                            userData?.role === 'user'
                            &&
                            <Link onClick={(e) => e.stopPropagation()} href="/userDashboard">
                            <li className={`mb-2 ${activeDash('/userDashboard')}`}>
                                <i className='uil uil-create-dashboard'></i> User Dashboard
                            </li>
                            </Link>
                        }
                        {
                            userData?.role === 'admin'
                            &&
                            <Link onClick={(e) => e.stopPropagation()} href="/adminDashboard">
                            <li className={`mb-2 ${activeDash('/adminDashboard')}`}>
                                <i className='uil uil-dashboard'></i> Admin Dashboard
                            </li>
                            </Link>
                        }
                        <p onClick={(e) => {
                            e.stopPropagation()
                            logout()
                            router.push('/login')
                        }} >
                            <li className={`mb-2 cursor-pointer ${activeDash('/adminDashboard')}`}>
                                <i className='uil uil-signout cursor-pointer'></i> Logout
                            </li>
                        </p>
                    </ul>
                    
                </div>
            </div>
        </div>
    );
};

export default NavItems;