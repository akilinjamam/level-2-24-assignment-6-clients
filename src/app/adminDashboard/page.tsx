import AdminAllPost from "@/components/dashboard/AdminAllPosts";
import { jwtDecoder } from "@/jwtDecoder/jwtDecoder";
import { cookies } from "next/headers";

const Dashboard = () => {

    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value as string;

    const getUser = jwtDecoder(accessToken);
    console.log(getUser)


    return (
        <div>
            <AdminAllPost token={accessToken}/>
        </div>
    );
};

export default Dashboard;