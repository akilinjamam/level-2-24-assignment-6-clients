/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAllUser,
  getOtherProfileUser,
  getProfileUser,
  updateCoverPhoto,
  updateProfilePhoto,
  updateUser,
} from "@/service/profileService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

export const useGetProfileUser = () => {
  return useQuery({
    queryKey: ["USERCOVERPHOTO"],
    queryFn: async () => await getProfileUser(),
  });
};
export const useGetOtherProfileUser = (userInfo: FieldValues) => {
  return useQuery({
    queryKey: ["OTHERUSERPROFILE"],
    queryFn: async () => await getOtherProfileUser(userInfo),
  });
};

export const useGetAllUser = () => {
  return useQuery({
    queryKey: ["ALLUSER"],
    queryFn: async () => await getAllUser(),
  });
};

export const useUpdateCover = (refetch: any) => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USERCOVERPHOTO"],
    mutationFn: async (userData) => await updateCoverPhoto(userData),
    onSuccess: (data) => {
      if (data?.success) {
        refetch();
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
export const useUpdateProfile = (refetch: any) => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USERPROFILEPHOTO"],
    mutationFn: async (userData) => await updateProfilePhoto(userData),
    onSuccess: (data) => {
      if (data?.success) {
        refetch();
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
export const useUpdateUser = (refetch: any) => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USERUPDATE"],
    mutationFn: async (userData) =>
      await updateUser(userData?.id, userData?.data),
    onSuccess: (data) => {
      if (data?.success) {
        refetch();
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
