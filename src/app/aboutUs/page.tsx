"use client"
import aboutus from '../../../images/aboutus.jpg';
import { useLottie } from 'lottie-react';
import service from './aboutUs.module.css';
import { serviceProvider } from "@/components/serviceProvider/serviceProvider";
import aboutAnim from '@/animation/aboutus.json'
import Image from 'next/image';


const Abouts = () => {

    const options = {
        animationData: aboutAnim,
        loop: true
    }

    const {View} = useLottie(options)


    return (
        <div className='lg:w-[50%] md:w-[70%] sm:w-[98%] xsm:w-[99%] mx-auto h-auto'>
            <div className="w-full lg:h-auto sm:h-auto xsm:h-auto bg-gray-50 rounded-lg my-6 lg:flex lg:items-center lg:justify-between p-3">
            <section className="lg:w-[43%] sm:w-full xsm:w-full  h-full bg-blue-50 flex items-center justify-center sm:py-3 xsm:py-3 lg:py-0">
                {/* <img style={{borderRadius:'10px'}} width={350} src={aboutus} alt="" /> */}
                {View}
            </section>
                <section className="lg:w-[48%] sm:w-full xsm:w-full h-full">
                    <p className="text-gray-700 text-3xl font-bold my-6">Our Mission : </p>
                    <hr />
                    <p className="text-gray-700 my-3">
                    At RoomBridge, our mission is to connect professionals with the perfect meeting spaces, fostering collaboration and innovation.
                    </p>
                    <p className="text-gray-700 my-3">
                    Our purpose is to simplify the process of finding and booking meeting rooms, making it easy and efficient for businesses of all sizes. We aim to create environments that inspire productivity and creativity, ensuring that every gathering, from small team meetings to large conferences, is supported by the right space.
                    </p>
                    <p className="text-gray-700 my-3 font-bold">
                    Our goals are to:
                    </p>
                    <p className="text-gray-700 my-3">
                    Provide a seamless and secure booking experience that saves time and effort.
                    </p>
                    <p className="text-gray-700 my-3">
                    Offer a diverse range of high-quality meeting spaces that cater to different needs.
                    </p>
                    <p className="text-gray-700 my-3">
                    Build lasting relationships with our clients by consistently exceeding their expectations.
                    </p>
                    <p className="text-gray-700 my-3">
                    At RoomBridge, we are dedicated to helping you bridge the gap between ideas and execution.
                    </p>
                </section>      
            </div>
            <div className="w-[100%] h-auto xsm:h-auto my-6 bg-gray-50 p-3 rounded-lg">
                <div className="mb-10 my-6 text-gray-700 text-3xl">
                    <p className="font-bold xsm:text-center sm:text-center lg:text-left">Meet the Team:</p>
                </div>
                <div className={`flex items-center justify-between ${service.container}`}>
                    {
                        serviceProvider.map((items, index) => {
                            return (
                                <div style={{backgroundColor: `${items.bgColor}`}} key={index+1} className={`w-[250px] xsm:w-full sm:w-full h-auto rounded-xl p-5 sm:m-5 xsm:m-5 text-sm font-semibold`}>
                                {items.image}
                                <br />
                                <p>Name: {items.name}</p>
                                <p>Designation: {items.designation}</p>
                                <p>Phone No: {items.number}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="w-full lg:h-auto sm:h-auto xsm:h-auto bg-gray-50 rounded-lg my-6 lg:flex lg:items-center lg:justify-between p-3">
                <section className="lg:w-[43%] sm:w-full xsm:w-full  h-full bg-blue-50 rounded-lg flex items-center justify-center sm:py-3 xsm:py-3 lg:py-4">
                    <Image style={{borderRadius:'10px'}} width={450} src={aboutus} alt="" />   
                </section>
                <section className="lg:w-[48%] sm:w-full xsm:w-full h-full">
                    <p className="text-gray-700 text-3xl font-bold my-6">Our Story : </p>
                    <hr />
                    <p className="text-gray-700 my-3">
                    RoomBridge was founded to solve a common challenge faced by professionals—finding the right meeting spaces quickly and efficiently. Our founders, with years of corporate experience, knew the frustration of securing suitable venues, leading them to create a solution that would simplify this process. With a focus on user-friendly technology and seamless booking, RoomBridge was designed to bridge the gap between businesses and the perfect spaces they need.
                    </p>
                    <p className="text-gray-700 my-3">
                    Starting as a small team with big ambitions, RoomBridge quickly grew by offering a wide variety of premium meeting spaces and prioritizing customer satisfaction. Through strategic partnerships and continuous innovation, we’ve established ourselves as a trusted name in the industry, helping businesses focus on what truly matters—productive and successful meetings.
                    </p>
                    
                </section>    
            </div>
        </div>
    );
};

export default Abouts;