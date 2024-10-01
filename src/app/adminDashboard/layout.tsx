import React, { ReactNode } from 'react';

const DashLayout = ({children}: {children: ReactNode}) => {
    return (
        <div className='w-full h-[86vh] flex my-2'>
            <div className='w-[20%] h-full bg-gray-200'>

            </div>
            <div className='w-[80%] h-full bg-green-200'>
            {children}
            </div>
        </div>
    );
};

export default DashLayout;