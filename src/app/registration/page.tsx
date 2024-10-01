"use client"
import { useLottie } from "lottie-react";
import { toast } from "react-toastify";
import registrationAnim from '@/animation/registration.json';
// import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";


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

const Registration = () => {
    // const navigate = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>()

    //   const [addLogin] = useLoginMutation()

      

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

        //    const res=  await addLogin(data).unwrap() 
        //    if(res){
        //      localStorage.setItem('roomBridgeToken', JSON.stringify(res.token))
        //      toast.success(res.message)
        //      navigate.push('/')
             
        //    } 
        
        } catch (error) {
            const err = error as ErrorResponse;
            toast.error(err.data.message)
        }
      }
    const options = {
        animationData: registrationAnim,
        loop: true
    }

    const {View} = useLottie(options)
    return (
        <div className="w-[100%] h-auto flex justify-center">
            <div className="lg:w-[50%] md:w-[70%] sm:w-[100%] xsm:w-[100%] h-[500px] bg-gray-100 my-5 lg:flex md:flex">
                <div className="lg:w-[50%] md:w-[50%] sm:w-full xsm:w-full h-[100%] bg-gray-200 p-5">

                    <section className="w-full h-[100%] flex items-center justify-center">
                        {View}
                    </section>

                </div>
                <div className="lg:w-[50%] md:w-[50%] sm:w-full xsm:w-full h-[100%] bg-gray-100">

                <section className="px-5 py-5">
                    <p  className="text-gray-700 text-3xl font-bold my-6">Registration Form:</p>
                    <hr />
                    <br />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input style={{background:'none',borderBottom:'1px solid lightgray'}} className='mb-3 w-[80%] ' type="email" {...register("email")} placeholder='type your email' />
                        {errors.email && <span>This field is required</span>}
                        <br />
                        <input style={{background:'none',borderBottom:'1px solid lightgray'}} className='mb-3 w-[80%] ' type="text"  {...register("password")} placeholder='type password' />
                        <br />
                        <br />
                        <input className='w-[100px] h-[35px] rounded-md bg-blue-500 text-white font-bold cursor-pointer' type="submit" value="SUBMIT" />
                    </form>
                </section>

                </div>
            </div>
        </div>
    );
};

export default Registration;



