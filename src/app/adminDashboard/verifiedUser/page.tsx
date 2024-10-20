"use client"

import { useGetAllUser} from "@/hooks/profile.hook";
import { TUser } from "@/types/posts.type";

const ManageUser = () => {

    const {data:getAllUsers} = useGetAllUser();
    
    return (
        <div className="w-full h-[500px] overflow-x-hidden overflow-y-scroll">
            <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-6 py-3 text-left border border-gray-300">Email</th>
                    <th className="px-6 py-3 text-left border border-gray-300">Role</th>
                    <th className="px-6 py-3 text-left border border-gray-300">Date</th>
                    <th className="px-6 py-3 text-left border border-gray-300">Verification</th>

                </tr>
                </thead>
                <tbody>
                    
                    {
                        getAllUsers?.data?.map((user:TUser, index:number) => {
                            return (
                                <tr key={index+1}>
                                    <td className="px-6 py-4 border border-gray-300">{user?.email}</td>
                                    <td className="px-6 py-4 border border-gray-300">{user?.role}</td>
                                    <td className="px-6 py-4 border border-gray-300">{user?.createdAt?.slice(0,10)}</td>

                                    <td className="px-6 py-4 border border-gray-300">{user?.verified === 'true' ? <p className="font-bold text-green-500">Verified</p> : <p className="font-bold text-red-500">Not Verified</p> }</td>
                                    
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            </div>
        </div>

    );
};

export default ManageUser;