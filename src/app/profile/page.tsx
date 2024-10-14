"use server"
import MyNewsFeeds from "@/components/newsFeeds/MyNewsFeeds";
import ProfileImages from "@/components/ProfileImages";
import { jwtDecoder } from "@/jwtDecoder/jwtDecoder";
import { TPosts } from "@/types/posts.type";
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

    const findMyPosts = data?.data?.filter((f:TPosts) => f?.userId?._id === userInfo?.id)

    console.log(findMyPosts)

    return (
        <div className="w-full min-h-auto my-2 relative">
            <div className="w-[50%] min-h-[1000px] bg-gray-200 mx-auto">
                <ProfileImages userInfo={userInfo}/>     
            </div>
            <div className="w-[50%] h-auto bg-gray-200 mx-auto">
                <MyNewsFeeds data={findMyPosts} accessToken={accessToken}/>
            </div>
        </div>
    );
};

export default Profile;