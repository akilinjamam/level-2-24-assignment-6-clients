"use client"
import LightGallery from 'lightgallery/react';
import fallbackImg from '../../images/default-fallback-image.png';
import Image from 'next/image';
import { TPosts } from '@/types/posts.type';
import Link from 'next/link';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

const LightGalleryImage = ({item} : {item:TPosts}) => {

    return (
        <div>
            <LightGallery elementClassNames='w-[100%] h-auto flex flex-wrap' speed={500} plugins={[lgThumbnail,lgZoom]}>
                {
                    item?.images?.slice(0,).map((image, index) => {
                        
                        return (
                            
                                <Link className='p-1'  key={index+1} href={image}>
                                    {
                                        item?.images?.length > 1 
                                        ?
                                        <Image width={455} height={455} src={image || fallbackImg} alt={`image-${index+1}`}/>
                                        :
                                        <Image width={1000} height={1000} src={image || fallbackImg} alt={`image-${index+1}`}/>
                                    }
                                </Link>
                           
                        )
                    })
                }                             
        </LightGallery>
        </div>
    );
};

export default LightGalleryImage;