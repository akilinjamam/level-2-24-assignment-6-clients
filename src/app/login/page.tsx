"use client"
import { useLottie } from "lottie-react";
import { toast } from "react-toastify";
import loginAnim from '@/animation/login.json';
import { SubmitHandler, useForm } from "react-hook-form";
import { useUserLogin, useUserSendRecoveryEmail } from "@/hooks/auth.hook";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


type Inputs = {
    name: string;
    email: string;
    password: string;
    phone: number;
    address: string;
  }

  type ErrorResponse = {
    data: {
      message: string;
    };
  };

const Login = () => {
    const navigate = useRouter();
    const [email, setEmail] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>()

      const {mutate:loginData, isPending, error, data} = useUserLogin()

      console.log(error)
      console.log(data)

      const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {

            if(!data.email && !data.password){
                return toast.error('email and password not added')
            }
            if(!data.email){
                return toast.error('email not added')
            }
            if(!data.password){
               return toast.error('password not added')
            }

            loginData(data)
           
        
        } catch (error) {
            const err = error as ErrorResponse;
            toast.error(err.data.message)
        }
      }
    const options = {
        animationData: loginAnim,
        loop: true
    }

    const {View} = useLottie(options)

    const {mutate:sendEmail, data:emailData} = useUserSendRecoveryEmail()
    console.log(emailData)
    const handleRecovery = async() => {

        if(email === ''){
            return toast.error('please provide your email address')
        }

        sendEmail({email: email})
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && data?.success) {
          navigate.push('/profile');
        }
      }, [data?.success, navigate]);
    return (
        <div className="w-[100%] h-auto flex justify-center">
            <div className="lg:w-[50%] md:w-[70%] sm:w-[100%] xsm:w-[100%] h-[500px] bg-gray-100 my-5 lg:flex md:flex">
                <div className="lg:w-[50%] md:w-[50%] sm:w-full xsm:w-full h-[100%] bg-gray-200">

                <section className="w-full h-[100%] flex items-center justify-center">
                    {View}
                </section>

                </div>
                <div className="lg:w-[50%] md:w-[50%] sm:w-full xsm:w-full h-[100%] bg-gray-100">

                <section className="px-5 py-5 h-full relative">
                    <p  className="text-gray-700 text-3xl font-bold my-6">Login Form:</p>
                    <hr />
                    <br />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input style={{background:'none',borderBottom:'1px solid lightgray'}} className='mb-3 w-[80%] ' type="email" {...register("email")} placeholder='type your email' onChange={(e) => setEmail(e.target.value)}/>
                        {errors.email && <span>This field is required</span>}
                        <br />
                        <input style={{background:'none',borderBottom:'1px solid lightgray'}} className='mb-3 w-[80%] ' type="text"  {...register("password")} placeholder='type password' />
                        <br />
                        
                        <br />
                        <input className='w-[100px] h-[35px] rounded-md bg-blue-500 text-white font-bold cursor-pointer' type="submit" value={`${isPending ? 'loading...' : 'submit'}`} />
                    </form>
                        <div className="w-[90%] flex items-center justify-between text-sm text-blue-400 absolute bottom-2">
                           <Link href='/changePassword'><button>Change Password</button></Link>
                           <button onClick={handleRecovery}>Recovery Password</button>
                        </div>
                </section>

                </div>
            </div>
        </div>
    );
};

export default Login;



