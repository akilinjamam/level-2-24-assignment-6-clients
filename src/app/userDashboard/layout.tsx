
import React, { ReactNode } from 'react';
import { userRoutes } from '../dashroutes/userRoutes';
import Link from 'next/link';


const userLayout = ({children}: {children: ReactNode}) => {

    
    return (
        <div className='w-full h-[86vh] flex items-center justify-between my-2'>
            <div className='lg:w-[19.5%] lg:block sm:hidden xsm:hidden h-full bg-gray-200 p-2'>
                {
                    userRoutes?.map((item: {link: string, name:string, icon:string}, index:number) => {
                        return (
                            <ul key={index+1}>
                                <Link className='font-bold' href={item.link}>
                                    <i className={`${item.icon} mr-1`}></i>
                                    {item?.name}
                                </Link>
                            </ul>
                        )
                    })
                }
            </div>
            <div className='lg:w-[80%] sm:w-[100%] xsm:w-[100%] h-full bg-gray-200 p-2'>
            {children}
            </div>
        </div>
    );
};

export default userLayout;