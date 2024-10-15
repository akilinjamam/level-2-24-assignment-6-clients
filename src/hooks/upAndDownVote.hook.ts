/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createDownvote,
  createUpvote,
  getDownvote,
  getUpvote,
} from "@/service/upAndDownVoteService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

export const useGetUpvote = () => {
  return useQuery({
    queryKey: ["USERGETUPVOTE"],
    queryFn: async () => await getUpvote(),
  });
};

export const useGetDownVote = () => {
  return useQuery({
    queryKey: ["USERGETDOWNVOTE"],
    queryFn: async () => await getDownvote(),
  });
};

export const usePostUpvote = (refetchUpvote: any, refetchDownvote: any) => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USERCREATEUPVOTE"],
    mutationFn: async (data) => await createUpvote(data),
    onSuccess: () => {
      refetchUpvote();
      refetchDownvote();
      toast.success("success");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useCreateDownvote = (refetchDownvote: any, refetchUpvote: any) => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USERCREATEDOWNVOTE"],
    mutationFn: async (data) => await createDownvote(data),
    onSuccess: () => {
      refetchDownvote();
      refetchUpvote();
      toast.success("success");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
