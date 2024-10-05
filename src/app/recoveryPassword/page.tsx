import React from 'react';

const RecoveryPassword = () => {
    return (
        <div>
            this is recovery password
        </div>
    );
};

export default RecoveryPassword;



// "use client"
// import { useLottie } from "lottie-react";
// import { toast } from "react-toastify";
// import registrationAnim from '@/animation/registration.json';
// import { SubmitHandler, useForm } from "react-hook-form";
// import { useUserRecoveryPassword, } from "@/hooks/auth.hook";
// import { useRouter, useSearchParams } from "next/navigation";
// import { jwtDecode, JwtPayload } from "jwt-decode";
// import { Suspense, useEffect } from "react";

// interface CustomJwtPayload extends JwtPayload {
//     email?: string;
//   }

// type Inputs = {
//     name: string;
//     email: string;
//     password: string;
//     phone: number;
//     address: string;
//   }

//   type ErrorResponse = {
//     data: {
//       message: string;
//     };
//   };

// const RecoveryPassword = () => {

//     const searchParams = useSearchParams();
//     const navigate = useRouter();
//     const token = searchParams.get('token') as string;
//     console.log(token)

//     const decode = jwtDecode<CustomJwtPayload>(token) 

//     const {exp, email} = decode;

//     const currentTime = Math.floor(Date.now() / 1000);
    
//     const remainingTimeInSeconds = exp as number - currentTime;

//     const remainingMinutes = Math.floor(remainingTimeInSeconds / 60);
  


//     // const navigate = useRouter();
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//       } = useForm<Inputs>()

//       const {mutate:sendRecoveryPass, isPending, data} = useUserRecoveryPassword();
    

//       const onSubmit: SubmitHandler<Inputs> = async (data) => {
//         try {

//             if(exp as number <= 0){
//                 return toast.error('token expired')
//             }

//             if(!data.email && !data.password){
//                 return toast.error('email and password not added')
//             }
//             if(!data.email){
//                 return toast.error('email not added')
//             }
            
//             if(!data.password){
//                return toast.error('password not added')
//             }
//            sendRecoveryPass({password: data.password})
        
//         } catch (error) {
//             const err = error as ErrorResponse;
//             toast.error(err.data.message)
//         }
//       }
//     const options = {
//         animationData: registrationAnim,
//         loop: true
//     }

//     const {View} = useLottie(options)

//     useEffect(() => {
//         if(data?.success){
//             navigate.push('/login')
//         }
//     },[data?.success, navigate])


//     return (
//         <Suspense  fallback={<div>Loading...</div>}>
//             <div className="w-[100%] h-auto flex justify-center">
//             <div className="lg:w-[50%] md:w-[70%] sm:w-[100%] xsm:w-[100%] h-[500px] bg-gray-100 my-5 lg:flex md:flex">
//                 <div className="lg:w-[50%] md:w-[50%] sm:w-full xsm:w-full h-[100%] bg-gray-200 p-5">

//                     <section className="w-full h-[100%] flex items-center justify-center">
//                         {View}
//                     </section>

//                 </div>
//                 <div className="lg:w-[50%] md:w-[50%] sm:w-full xsm:w-full h-[100%] bg-gray-100">

//                 <section className="px-5 py-5">
//                     <p  className="text-gray-700 text-3xl font-bold my-6">Recover Password: will be expired : {remainingMinutes}</p>
//                     <hr />
//                     <br />
//                     <form onSubmit={handleSubmit(onSubmit)}>
                        
//                         <input value={email} style={{background:'none',borderBottom:'1px solid lightgray'}} className='mb-3 w-[80%] ' type="email" {...register("email")} placeholder='type your email' />
//                         {errors.email && <span>This field is required</span>}
//                         <br />
//                         <input style={{background:'none',borderBottom:'1px solid lightgray'}} className='mb-3 w-[80%] ' type="password"  {...register("password")} placeholder='type password' />
//                         <br />
//                         <br />
//                         <input className='w-[100px] h-[35px] rounded-md bg-blue-500 text-white font-bold cursor-pointer' type="submit" value={`${isPending ? 'loading' : 'SUBMIT'}`} />
//                     </form>
//                 </section>

//                 </div>
//             </div>
//             </div>
//         </Suspense>
//     );
// };

// export default RecoveryPassword;



