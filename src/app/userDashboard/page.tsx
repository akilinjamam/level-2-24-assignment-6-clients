"use server"

import UserAllPost from "@/components/dashboard/UserAllPost";

import { cookies } from "next/headers";

const cookieStore = cookies();
const accessToken = cookieStore.get("accessToken")?.value as string;



const Page = () => {
    return (
        <div >
           <UserAllPost token={accessToken}/>
        </div>
    );
};

export default Page;