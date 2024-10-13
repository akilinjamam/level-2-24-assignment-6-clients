"use server"
import AddPost from "@/components/post/AddPost";
import ProfileImages from "@/components/ProfileImages";
import { jwtDecoder } from "@/jwtDecoder/jwtDecoder";
import { cookies } from "next/headers";

const Profile = () => {

    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value as string;
    const userInfo = jwtDecoder(accessToken);

    return (
        <div className="w-full min-h-[1200px] my-2">
            <div className="w-[50%] min-h-[1200px] bg-gray-100 mx-auto">
                <ProfileImages/>
                <AddPost userInfo={userInfo}/>
            </div>
        </div>
    );
};

export default Profile;