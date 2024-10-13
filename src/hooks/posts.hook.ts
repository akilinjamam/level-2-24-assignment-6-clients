/* eslint-disable @typescript-eslint/no-explicit-any */
import { uploadPosts } from "@/service/postsService";
import { getProfileUser } from "@/service/profileService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

export const useGetPost = () => {
  return useQuery({
    queryKey: ["USERPOST"],
    queryFn: async () => await getProfileUser(),
  });
};

export const useUploadPosts = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USERCREATEPOST"],
    mutationFn: async (userData) => await uploadPosts(userData),
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
// export const useUpdateProfile = (refetch: any) => {
//   return useMutation<any, Error, FieldValues>({
//     mutationKey: ["USERPROFILEPHOTO"],
//     mutationFn: async (userData) => await updateProfilePhoto(userData),
//     onSuccess: (data) => {
//       if (data?.success) {
//         refetch();
//         toast.success(data?.message);
//       } else {
//         toast.error(data?.message);
//       }
//     },
//     onError: (error) => {
//       toast.error(error.message);
//     },
//   });
// };
