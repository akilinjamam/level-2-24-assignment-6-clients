/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getProfileUser,
  // updateCoverPhoto
} from "@/service/profileService";
import { useQuery } from "@tanstack/react-query";
// import { FieldValues } from "react-hook-form";
// import { toast } from "react-toastify";

export const useGetPost = () => {
  return useQuery({
    queryKey: ["USERPOST"],
    queryFn: async () => await getProfileUser(),
  });
};

// export const useUpdateCover = (refetch: any) => {
//   return useMutation<any, Error, FieldValues>({
//     mutationKey: ["USERCOVERPHOTO"],
//     mutationFn: async (userData) => await updateCoverPhoto(userData),
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
