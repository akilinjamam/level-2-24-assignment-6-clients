"use client"
import { ChangeEvent } from 'react';
import '../../app/globals.css';



const Profile = () => {
    
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const file = e.target.files![0] as any;
        const formData = new FormData();
        formData.append('coverImg', file)
      };

    return (
        <div className="w-full min-h-[1200px] my-2">
            <div className="w-[50%] min-h-[1200px] bg-gray-100 mx-auto">
                <section className="w-full h-[400px] bg-gray-200 relative">
                    <div className="w-[300px] h-[300px] rounded-full bg-gray-300 absolute left-[20px] bottom-[-70px] viewWithHover">
                        <label htmlFor="image">
                            <i className="uil uil-pen absolute bottom-[70px] right-[50px] hide cursor-pointer"></i>
                        </label>
                        <input className='hidden' type="file" name="" id="image" />
                    </div>
                    <label htmlFor="coverImg">
                        <i className="uil uil-pen absolute bottom-[20px] right-[20px] cursor-pointer"></i>
                    </label>
                    <input onChange={(e) => handleImageChange(e)} className='hidden' type="file" name="" id="coverImg" />
                </section>
                <section className="w-full h-[300px] bg-gray-400 ">
        
                </section>
            </div>
        </div>
    );
};

export default Profile;