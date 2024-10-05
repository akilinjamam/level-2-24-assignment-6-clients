/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useLottie } from 'lottie-react';
import { toast } from 'react-toastify';
import registrationAnim from '@/animation/registration.json';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUserRecoveryPassword } from '@/hooks/auth.hook';
import { useRouter, useSearchParams } from 'next/navigation';
import {jwtDecode, JwtPayload } from 'jwt-decode';
import { useEffect, useState } from 'react';

interface CustomJwtPayload extends JwtPayload {
  email?: string;
}

type Inputs = {
  email: string;
  password: string;
};

// type ErrorResponse = {
//   data: {
//     message: string;
//   };
// };

const RecoveryPassword = () => {
  const searchParams = useSearchParams();
  const navigate = useRouter();
  const token = searchParams.get('token') as string;

  const [email, setEmail] = useState<string | null>(null);
  const [remainingMinutes, setRemainingMinutes] = useState<number | null>(null);

  // Function to decode the token and calculate remaining time
  const decodeToken = (token: string) => {
    try {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      const { exp, email } = decoded;

      if (!exp) {
        throw new Error('Token does not contain expiration time.');
      }

      const currentTime = Math.floor(Date.now() / 1000);
      const remainingTimeInSeconds = exp - currentTime;
      const minutesLeft = Math.floor(remainingTimeInSeconds / 60);

      if (minutesLeft <= 0) {
        toast.error('Token has expired');
        navigate.push('/login');
      } else {
        setEmail(email || '');
        setRemainingMinutes(minutesLeft);
      }
    } catch (error) {
      toast.error('Invalid token');
      navigate.push('/login');
    }
  };

  // Decode the token on initial render
  useEffect(() => {
    if (token) {
      decodeToken(token);
    }
  }, [token]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutate: sendRecoveryPass, isPending, data } = useUserRecoveryPassword();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (remainingMinutes && remainingMinutes <= 0) {
      return toast.error('Token has expired');
    }

    if (!data.password) {
      return toast.error('Please provide a new password');
    }

    sendRecoveryPass({ password: data.password });
  };

  // Redirect to login after successful password reset
  useEffect(() => {
    if (data?.success) {
      toast.success('Password successfully reset. Redirecting to login...');
      navigate.push('/login');
    }
  }, [data?.success, navigate]);

  const options = {
    animationData: registrationAnim,
    loop: true,
  };

  const { View } = useLottie(options);

  return (
    <div className="w-full h-auto flex justify-center">
      <div className="lg:w-[50%] md:w-[70%] sm:w-full xsm:w-full h-auto bg-gray-100 my-5 lg:flex md:flex">
        <div className="lg:w-[50%] md:w-[50%] sm:w-full xsm:w-full h-[100%] bg-gray-200 p-5">
          <section className="w-full h-[100%] flex items-center justify-center">
            {View}
          </section>
        </div>
        <div className="lg:w-[50%] md:w-[50%] sm:w-full xsm:w-full h-[100%] bg-gray-100">
          <section className="px-5 py-5">
            {remainingMinutes !== null ? (
              <p className="text-gray-700 text-3xl font-bold my-6">
                Recover Password: {remainingMinutes} minutes remaining
              </p>
            ) : (
              <p className="text-gray-700 text-3xl font-bold my-6">
                Loading token information...
              </p>
            )}

            <hr />
            <br />

            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                readOnly
                value={email || ''}
                style={{ background: 'none', borderBottom: '1px solid lightgray' }}
                className="mb-3 w-[80%]"
                type="email"
                placeholder="Email"
              />
              {errors.email && <span>This field is required</span>}
              <br />

              <input
                style={{ background: 'none', borderBottom: '1px solid lightgray' }}
                className="mb-3 w-[80%]"
                type="password"
                {...register('password', { required: true })}
                placeholder="Enter new password"
              />
              {errors.password && <span>This field is required</span>}
              <br />

              <input
                className="w-[100px] h-[35px] rounded-md bg-blue-500 text-white font-bold cursor-pointer"
                type="submit"
                value={`${isPending ? 'Loading...' : 'Submit'}`}
              />
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RecoveryPassword;
