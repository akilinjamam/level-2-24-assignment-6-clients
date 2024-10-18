"use client"
import React, { ReactNode } from 'react';
import { userRoutes } from '../dashroutes/userRoutes';
import Link from 'next/link';

const userLayout = ({children}: {children: ReactNode}) => {
    return (
        <div className='w-full h-[86vh] flex items-center justify-between my-2'>
            <div className='w-[19.5%] h-full bg-gray-200 p-2'>
                {
                    userRoutes?.map((item: {link: string, name:string}, index:number) => {
                        return (
                            <ul key={index+1}>
                                <Link href={item.link}>
                                    {item?.name}
                                </Link>
                            </ul>
                        )
                    })
                }
            </div>
            <div className='w-[80%] h-full bg-gray-200 p-2'>
            {children}
            </div>
        </div>
    );
};

export default userLayout;