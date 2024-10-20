import Link from 'next/link';
import React, { ReactNode } from 'react';

const DashLayout = ({children}: {children: ReactNode}) => {
    return (
        <div className='w-full h-[86vh] flex items-center justify-between my-2'>
            <div className='lg:w-[19.5%] lg:block sm:hidden xsm:hidden h-full bg-gray-200 p-2'>
                <Link href="/adminDashboard" className='font-bold cursor-pointer'><i className="uil uil-document-layout-right"></i> Manage Posts</Link>
                <br />
                <br />
                <Link href="/adminDashboard/manageUser" className='font-bold cursor-pointer'><i className="uil uil-users-alt"></i> Manage User</Link>
                <br />
                <br />
                <Link href="/adminDashboard/verifiedUser" className='font-bold cursor-pointer'><i className="uil uil-users-alt"></i> Verified User</Link>
                <br />
                <br />
                <Link href="/adminDashboard/graph" className='font-bold cursor-pointer'><i className="uil uil-graph-bar"></i> Graph</Link>
            </div>
            <div className='lg:w-[80%] sm:w-[100%] xsm:w-[100%] h-full bg-gray-200 p-2'>
            {children}
            </div>
        </div>
    );
};

export default DashLayout;