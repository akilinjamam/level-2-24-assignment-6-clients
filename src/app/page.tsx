"use server";  
import { cookies } from "next/headers";

import NewsFeeds from "@/components/newsFeeds/NewsFeeds";

const Home = async () => {

    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value as string;

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

    return (
       <NewsFeeds data={data} accessToken={accessToken}/>
    );
};

export default Home;
