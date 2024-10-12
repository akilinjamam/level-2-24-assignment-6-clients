"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFollow, getFollow, removeFollow } from "@/service/followService";
import // updateCoverPhoto
"@/service/profileService";

import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

export const useGetFollow = () => {
  return useQuery({
    queryKey: ["GETFOLLOW"],
    queryFn: async () => await getFollow(),
  });
};

export const useCreateFollow = (refetch: any) => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATEFOLLOW"],
    mutationFn: async (data) => await createFollow(data),
    onSuccess: (data) => {
      refetch();
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useRemoveFollow = (refetch: any) => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["REMOVEFOLLOW"],
    mutationFn: async (data) => await removeFollow(data),
    onSuccess: (data) => {
      refetch();
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
