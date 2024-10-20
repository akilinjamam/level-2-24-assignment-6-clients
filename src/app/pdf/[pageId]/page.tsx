"use client"
import { useGetAllPost } from '@/hooks/posts.hook';
import { TPosts } from '@/types/posts.type';
import Image from 'next/image';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import fallbackImg from '../../../../images/default-fallback-image.png';

const PdfGenerate = ({ params }: { params: any }) => {
    const postId = params?.pageId;

    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef })

    const {data} = useGetAllPost()

    const findPost = data?.data?.find((f:TPosts) => f?._id === postId) as TPosts;


    return (
        <div>
            <div  className='w-[50%] mx-auto bg-gray-100 my-2 p-2'>
                <div style={{padding: '10px'}} ref={contentRef} >
                    <p className='text-sm'>Author: {findPost?.name}</p>
                    <br />
                    <p className='font-bold'>{findPost?.title}</p>
                    <hr />
                    <br />
                    <div className='flex flex-wrap'>
                        {
                            findPost?.images?.map((item:any, index:number) => {
                                return (
                                    <Image key={index+1} width={400} height={400} src={item || fallbackImg} alt='images-post'/>
                                )
                            })
                        }
                    </div>
                    <br />
                    <div>
                        <p>Category: {findPost?.category}</p>
                    </div>
                    <br />
                    <div dangerouslySetInnerHTML={{__html: findPost?.description}}>

                    </div>
                </div>
                <button onClick={() => reactToPrintFn()} className="px-4 py-2 bg-blue-500 text-white mt-4">
                        Print PDF
                </button>
            </div>
        </div>
    );
};

export default PdfGenerate;
