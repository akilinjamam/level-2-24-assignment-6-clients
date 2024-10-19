"use client"

import { useGetAllUser, useUpdateUser } from "@/hooks/profile.hook";
import { TUser } from "@/types/posts.type";

const ManageUser = () => {

    const {data:getAllUsers, refetch} = useGetAllUser();
    const {mutate:updateUserRole, error, data} = useUpdateUser(refetch);
    console.log(error)
    console.log(data)


    const handleUpdateUser = (userId:string) => {
        const data = {
            id: userId,
            data: {
                role: 'user'
            }
        }
        updateUserRole(data)
    }
    const handleUpdateAdmin = (adminId:string) => {
        const data = {
            id: adminId,
            data: {
                role: 'admin'
            }
        }
        updateUserRole(data)
    }



    return (
        <div className="w-full h-[500px] overflow-x-hidden overflow-y-scroll">
            <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-6 py-3 text-left border border-gray-300">Email</th>
                    <th className="px-6 py-3 text-left border border-gray-300">Role</th>
                    <th className="px-6 py-3 text-left border border-gray-300">Action</th>
                </tr>
                </thead>
                <tbody>
                    
                    {
                        getAllUsers?.data?.map((user:TUser, index:number) => {
                            return (
                                <tr key={index+1}>
                                    <td className="px-6 py-4 border border-gray-300">{user?.email}</td>
                                    <td className="px-6 py-4 border border-gray-300">{user?.role}</td>
                                    <td className="px-6 py-4 border border-gray-300">{user?.role === 'admin' ? <span onClick={() => handleUpdateUser(user?._id)} className="bg-red-500 text-white font-bold px-3 py-3 m-3 cursor-pointer">Make User</span> : <span onClick={() => handleUpdateAdmin(user?._id)} className="bg-green-500 text-white font-bold px-2 py-3 m-3 cursor-pointer">Make Admin</span> }</td>
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