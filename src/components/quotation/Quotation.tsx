"use server"
import fallbackImg from '../../../images/default-fallback-image.png';
import quotationImg from '../../../images/garden-quotation.jpg';

import Image from "next/image";

const Quotation = () => {
    return (
        <div className='w-[50%] mx-auto bg-gray-100 my-2 p-2'>
            <div className='w-full h-[40px] p-2 bg-gray-200'>
                <p className='text-orange-500 font-bold text-sm text-center'>Welcome to Garden Gallery</p>
            </div>
            <br />
            <div className="w-full flex items-center justify-center">
                <div>
                    <Image width={500} height={500} src={quotationImg || fallbackImg} alt=""/>
                </div>
            </div>
        </div>
    );
};

export default Quotation;