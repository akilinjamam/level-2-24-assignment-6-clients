"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { homeRoutes, THomeRoutes } from "./homeRoutes";
import { useState } from "react";

const Navbar = () => {

   const [hide, setHide] = useState(true);

    const pathName = usePathname();
   console.log(pathName)
    return (
        <div onClick={() => {
            setHide(true)
        }} className="w-full h-[50px] bg-gray-100 flex items-center justify-between ">
            <div className="lg:w-[24.5%] md:w-[40%] sm:w-[50%] xsm:w-[70%]  h-full p-2 flex items-center justify-start relative">
                <input className="w-10/12 rounded-full px-8 text-sm h-[80%]" type="text" name="" id="" />

                <i className="uil uil-search absolute top-[13px] left-5"></i>
            </div>
           <div className="w-[50%] xsm:hidden md:flex  h-full lg:flex lg:items-center lg:justify-around">
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
                }} className="w-[40px] h-[40px] bg-gray-200 rounded-full cursor-pointer">

                </div>
                <div className={`w-[200px] h-auto bg-gray-100 top-[60px] right-0 ${hide ? 'hidden' : 'absolute z-30'} p-2 text-sm`}>
                    <ul >
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
                    </ul>
   
                </div>
                <div className={`w-[200px] h-auto bg-gray-100 top-[60px] right-0 ${hide ? 'hidden' : 'xsm:absolute sm:absolute md:hidden lg:hidden'} p-2 text-sm`}>
                    <ul >
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
                    </ul>
                    
                </div>
            </div>
        </div>
    );
};

export default Navbar;
