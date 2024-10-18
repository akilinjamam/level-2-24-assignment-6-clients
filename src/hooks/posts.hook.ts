/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  deletePosts,
  getPosts,
  updateImagePosts,
  updatePosts,
  uploadPosts,
} from "@/service/postsService";
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

export const useGetAllPost = () => {
  return useQuery({
    queryKey: ["ALLPOST"],
    queryFn: async () => await getPosts(),
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

export const useUpdatePosts = (refetch: any) => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USERUPDATEEPOST"],
    mutationFn: async (userData) =>
      await updatePosts(userData?.id, userData?.data),
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
export const useUpdateImagePosts = (refetch: any) => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USERUPDATEIMAGEEPOST"],
    mutationFn: async (userData) => await updateImagePosts(userData),
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
export const useDeletePosts = (refetch: any) => {
  return useMutation<any, Error, string>({
    mutationKey: ["USERDELETEIMAGEEPOST"],
    mutationFn: async (id) => await deletePosts(id),
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
