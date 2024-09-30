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
        <div className="w-full h-[50px] bg-gray-100 flex items-center justify-between ">
            <div className="w-[24.5%] h-full ">
               
            </div>
           <div className="w-[50%] h-full flex items-center justify-around">
                {
                    homeRoutes?.map((item: THomeRoutes, index: number) => {
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
                <div onClick={() => setHide(!hide)} className="w-[40px] h-[40px] bg-gray-200 rounded-full cursor-pointer">

                </div>
                <div className={`w-[200px] h-[100px] bg-gray-100 top-[60px] right-0 ${hide ? 'hidden' : 'absolute'}`}>

                </div>
            </div>
        </div>
    );
};

export default Navbar;
