"use client"
// import contactus from '../../images/contactus.jpg'
import { useLottie } from 'lottie-react';
import contactAnim from '@/animation/contactus.json';
const Contact = () => {
    const options = {
        animationData: contactAnim,
        loop: true
    }

    const {View} = useLottie(options)
    return (
        <div className={`w-[50%] mx-auto h-auto bg-gray-50 rounded-lg my-6 lg:flex lg:items-center lg:justify-between p-3`}>
        <section className="lg:w-[46%] sm:w-full xsm:w-full h-full bg-blue-50 flex items-center justify-center">
            {/* <img style={{borderRadius:'10px'}} width={450} src={contactus} alt="" /> */}
            {View}
        </section>
        <section className="lg:w-[48%] sm:w-full xsm:w-full h-full">
            <p className="text-gray-700 text-3xl font-bold my-6">Contact Us </p>
            <hr />
            <p className="text-gray-700 my-3">
                Email : roombridge223@gmail.com
            </p>
            <p className="text-gray-700 my-3">
                Phone No: : +801-33452365
            </p>
            <p className="text-gray-700 my-3">
                Office Address : Kolpolok, Road-2, Block-C/Line-3, BridgeCom-Tower, Kalamial Bazar, Chittagong, Bangladesh
            </p>
    
            
            <p  className="text-gray-700 text-3xl font-bold my-6">Contact Form:</p>
            <hr />
            <br />
            <form action="">
                <input style={{background:'none',borderBottom:'1px solid lightgray'}} className='mb-3 w-[400px] ' type="text" name="" id="" placeholder='type your Name' />
                <br />
                <input style={{background:'none',borderBottom:'1px solid lightgray'}} className='mb-3 w-[400px] ' type="email" name="" id="" placeholder='type your email' />
                <br />
                <input style={{background:'none',borderBottom:'1px solid lightgray'}} className='mb-3 w-[400px] ' type="text" name="" id="" placeholder='type subject' />
                <br />
                <textarea style={{background:'none',border:'1px solid lightgray',maxHeight:'100px'}} className='mb-3 w-[400px] p-1 ' id="w3review" name="w3review"/>
                <br />
                <input className='w-[100px] h-[35px] rounded-md bg-gray-600 text-white font-bold cursor-pointer' type="submit" value="SUBMIT" />
            </form>
        </section>
        
    </div>
    );
};

export default Contact;