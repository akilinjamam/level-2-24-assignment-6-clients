/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { CustomJwtPayload } from "@/jwtDecoder/jwtDecoder";

import AddPayment from "../post/AddPayment";


const PaymentModal = ({userInfo, open, setOpen} : {userInfo:CustomJwtPayload, open:boolean, setOpen:any}) => {

   
    return (
        <div className={` w-full h-full z-20 flex items-center justify-center bg-black bg-opacity-85 ${open ? 'fixed top-0' : 'hidden' }`}>
            <i onClick={() => setOpen(false)} className="uil uil-times absolute top-5 right-5 text-4xl text-gray-200 cursor-pointer"></i>
            <div className="w-[50%] h-auto overflow-x-hidden overflow-y-scroll bg-gray-200">
                 <AddPayment userInfo={userInfo}/>
            </div>
        </div>
    );
};

export default PaymentModal;