/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import MyNewsFeeds from "@/components/newsFeeds/MyNewsFeeds";
// import MyNewsFeeds from "@/components/newsFeeds/MyNewsFeeds";
// import ProfileImg from "@/components/ProfileImg";
import ProfileImgWithId from "@/components/ProfileImgWithId";
// import { jwtDecoder } from "@/jwtDecoder/jwtDecoder";
import { TPosts } from "@/types/posts.type";
import { cookies } from "next/headers";
;

const ProfileWithId = async ({params}: {params:any}) => {

    const profileId = params?.pageId;
    

    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value as string;
    // const userInfo = jwtDecoder(accessToken);

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
    

    const findMyPosts = myPosts?.filter((f:TPosts) => f?.userId?._id === profileId)
    

    console.log(findMyPosts)
    console.log(profileId)

    return (
        <div>
            <ProfileImgWithId userInfo={profileId} myToken={accessToken}/>
            <MyNewsFeeds data={findMyPosts} accessToken={accessToken}/>
            
        </div>
    );
};

export default ProfileWithId;