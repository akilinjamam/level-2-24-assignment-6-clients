/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { TFavourite } from "@/components/favourite/Favourite";
import MyFavNewsFeeds from "@/components/newsFeeds/MyFavNewsFeeds";
import MyNewsFeeds from "@/components/newsFeeds/MyNewsFeeds";
import ProfileImg from "@/components/ProfileImg";
import { jwtDecoder } from "@/jwtDecoder/jwtDecoder";
import { TPosts } from "@/types/posts.type";
import { cookies } from "next/headers";
;

const Profile = async ({searchParams}: {searchParams:any}) => {

    const favourite = searchParams?.favourite;
    console.log(favourite)

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

    const getFavouritePosts = async () => {
        const url = `${process.env.NEXT_PUBLIC_BASE_API}/api/favourite/`;

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

    const favouritedata = await getFavouritePosts();

    const myPosts = data?.data;
    const myFavouritePosts = favouritedata?.data

    const findMyPosts = myPosts?.filter((f:TPosts) => f?.userId?._id === userInfo?.id)
    const findMyFavouritePosts = myFavouritePosts?.filter((f:TFavourite) => f?.userId?._id === userInfo?.id)

    console.log(findMyPosts)

    return (
        <div>
            <ProfileImg userInfo={userInfo}/>
            {
                (favourite === undefined || favourite === false)
                ?
                <MyNewsFeeds data={findMyPosts} accessToken={accessToken}/>
                :
                <MyFavNewsFeeds data={findMyFavouritePosts} accessToken={accessToken} />
            }
            
        </div>
    );
};

export default Profile;