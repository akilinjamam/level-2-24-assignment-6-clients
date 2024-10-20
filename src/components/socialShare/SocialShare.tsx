"use client"
import React from 'react';
import { FacebookShareButton, LinkedinShareButton, WhatsappShareButton } from 'react-share';

const SocialShare = ({postId}: {postId:string}) => {
    return (
        <div className='flex text-blue-700'>
            <div>
                <FacebookShareButton url={`https://level-2-24-assignment-6-clients.vercel.app/pdf/${postId}`}>
                    <i className="uil uil-facebook-f mx-2"></i>
                </FacebookShareButton>
            </div>
            <div>
                <WhatsappShareButton url={`https://level-2-24-assignment-6-clients.vercel.app/pdf/${postId}`}>
                <i className="uil uil-whatsapp-alt mx-2"></i>
                </WhatsappShareButton>
            </div>
            <div>
                <LinkedinShareButton url={`https://level-2-24-assignment-6-clients.vercel.app/pdf/${postId}`}>
                <i className="uil uil-linkedin mx-2"></i>
                </LinkedinShareButton>
            </div>
        </div>
    );
};

export default SocialShare;