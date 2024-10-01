"use client"
import { useLottie } from "lottie-react";
import { toast } from "react-toastify";
import loginAnim from '@/animation/login.json';
// import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import Container from "@/container/Container";


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
        animationData: loginAnim,
        loop: true
    }

    const {View} = useLottie(options)
    return (
        <Container>
            <div className={`w-full h-[700px] bg-gray-100 rounded-lg my-6 lg:flex lg:items-center lg:justify-between p-3`}>
                <section className="lg:w-[46%] sm:w-full xsm:w-full h-full bg-gray-200 flex items-center justify-center">
                    {/* <img style={{borderRadius:'10px'}} width={450} src={contactus} alt="" /> */}
                    {View}
                </section>
                <section className="lg:w-[48%] sm:w-full xsm:w-full h-full">
                    <p  className="text-gray-700 text-3xl font-bold my-6">Login Form:</p>
                    <hr />
                    <br />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        
                        <input style={{background:'none',borderBottom:'1px solid lightgray'}} className='mb-3 w-[400px] ' type="email" {...register("email")} placeholder='type your email' />
                        {errors.email && <span>This field is required</span>}
                        <br />
                        <input style={{background:'none',borderBottom:'1px solid lightgray'}} className='mb-3 w-[400px] ' type="text"  {...register("password")} placeholder='type password' />
                        <br />
                        <input className='w-[100px] h-[35px] rounded-md bg-blue-500 text-white font-bold cursor-pointer' type="submit" value="SUBMIT" />
                    </form>
                </section>
            </div>
        </Container>
    );
};

export default Login;