import Link from "next/link";
import DeletePost from "../deletePost/DeletePost";

const Other = ({ postId}: {postId:string}) => {
    
    return (
        <div className="w-full h-[40px] flex items-center justify-end">
            <div>
                <Link className="px-2 py-1 mx-3 rounded bg-blue-500 text-white font-bold" href={`editPost/${postId}`}>Edit</Link>
            </div>
            <div>
               <DeletePost postId={postId}/>
            </div>
        </div>
    );
};

export default Other;