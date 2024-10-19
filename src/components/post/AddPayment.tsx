"use client"
import { useCreatePayment } from '@/hooks/payment.hook';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomJwtPayload } from '@/jwtDecoder/jwtDecoder';

const AddPayment = ({userInfo} : {userInfo:CustomJwtPayload}) => {

    const {mutate:createPayment, error, data} = useCreatePayment();
    console.log(error)
    console.log(data?.data?.url)
   
    const handlePost = (event:any) => {
        event.preventDefault();
        const data = {
            userId: userInfo?.id,
            paid:false
        };

        createPayment(data)
    }

    return (
        <div className="p-2">
            <p style={{borderBottom:'2px solid black'}} className='text-2xl font-bold text-center my-3'>Make Your Payment</p>
            <br />
            <form className='text-sm' onSubmit={handlePost}>
            <label className='font-bold' htmlFor="">Your Name:</label>
            <br />
            <input className='font-bold' value={userInfo.name} type="text" name="" id="" />
            <br /><br />
            <label className='font-bold' htmlFor="">Your Email:</label>
            <br />        
            <input className='font-bold' value={userInfo.email} type="text" name="" id="" />
            <br /><br />
            <label className='font-bold' htmlFor="">Amount:</label> 
            <br />       
            <input className='font-bold' value={100} type="number" name="" id="" />    
            <br /><br />
            <input className='text-white font-bold px-2 py-1 bg-blue-500 cursor-pointer' type="submit" value="Pay" /> 
                
            </form>
            <br />
        </div>
    );
};

export default AddPayment;

