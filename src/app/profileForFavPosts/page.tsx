"use server"

import { TFavourite } from "@/components/favourite/Favourite";
import MyFavNewsFeeds from "@/components/newsFeeds/MyFavNewsFeeds";
import ProfileImg from "@/components/ProfileImg";
import { jwtDecoder } from "@/jwtDecoder/jwtDecoder";
import { cookies } from "next/headers";

const ProfileForFavPosts = async() => {

    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value as string;
    const userInfo = jwtDecoder(accessToken);


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

    const myFavouritePosts = favouritedata?.data;

    const findMyFavouritePosts = myFavouritePosts?.filter((f:TFavourite) => f?.userId?._id === userInfo?.id)
    

    console.log(findMyFavouritePosts)



    return (
        <div>
            <ProfileImg userInfo={userInfo}/>
            <MyFavNewsFeeds data={findMyFavouritePosts} accessToken={accessToken} />
        </div>
    );
};

export default ProfileForFavPosts;