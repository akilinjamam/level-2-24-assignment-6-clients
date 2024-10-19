import Link from 'next/link';
import React, { ReactNode } from 'react';

const DashLayout = ({children}: {children: ReactNode}) => {
    return (
        <div className='w-full h-[86vh] flex items-center justify-between my-2'>
            <div className='w-[19.5%] h-full bg-gray-200 p-2'>
                <Link href="/adminDashboard" className='font-bold cursor-pointer'><i className="uil uil-document-layout-right"></i> Manage Posts</Link>
                <br />
                <br />
                <Link href="/adminDashboard/manageUser" className='font-bold cursor-pointer'><i className="uil uil-users-alt"></i> Manage User</Link>
            </div>
            <div className='w-[80%] h-full bg-gray-200 p-2'>
            {children}
            </div>
        </div>
    );
};

export default DashLayout;