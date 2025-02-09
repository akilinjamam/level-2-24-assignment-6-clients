"use server";  
import { cookies } from "next/headers";

import NewsFeeds from "@/components/newsFeeds/NewsFeeds";
// import Quotation from "@/components/quotation/Quotation";

const Home = async ({searchParams}: { searchParams: { [key: string]: string | string[] | undefined } }) => {

    const searchTerm = searchParams?.searchTerm
    const decodedSearchTerm = searchTerm ? decodeURIComponent(searchTerm as string) : '';
    console.log('decode:',decodedSearchTerm)

    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value as string;

    const getPosts = async () => {
        const url = `${process.env.NEXT_PUBLIC_BASE_API}/api/posts?searchTerm=${decodedSearchTerm}`;

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
        <div>
            {/* <Quotation/> */}
            <NewsFeeds data={data} accessToken={accessToken}/>
        </div>
    );
};

export default Home;
