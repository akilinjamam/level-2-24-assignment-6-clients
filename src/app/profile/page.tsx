/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import MyNewsFeeds from "@/components/newsFeeds/MyNewsFeeds";
import ProfileImg from "@/components/ProfileImg";
import { jwtDecoder } from "@/jwtDecoder/jwtDecoder";
import { TPosts } from "@/types/posts.type";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
;

const Profile = async () => {

    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value as string;
    const userInfo = jwtDecoder(accessToken);

    const getPosts = async () => {
        const url = `${process.env.NEXT_PUBLIC_BASE_API}/api/posts/`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${accessToken}`,
                },
                cache: 'no-store',
                
            });

            revalidateTag("posts")

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const data = await getPosts();


    const myPosts = data?.data;
    

    const findMyPosts = myPosts?.filter((f:TPosts) => f?.userId?._id === userInfo?.id)
    

    console.log(findMyPosts)

    return (
        <div>
            <ProfileImg userInfo={userInfo}/>
            <MyNewsFeeds data={findMyPosts} accessToken={accessToken}/>
            
        </div>
    );
};

export default Profile;