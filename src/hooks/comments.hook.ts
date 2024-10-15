/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "@/service/commentService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

export const useGetComments = () => {
  return useQuery({
    queryKey: ["USERCOMMENTS"],
    queryFn: async () => await getComments(),
  });
};

export const usePostComments = (refetch: any) => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USERCOMMENTS"],
    mutationFn: async (data) => await createComment(data),
    onSuccess: () => {
      refetch();
      toast.success("comment created successfully");
    },
  });
};

export const useEditComments = (refetch: any) => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USEREDITCOMMENTS"],
    mutationFn: async (data) => await updateComment(data?.data, data?.id),
    onSuccess: () => {
      refetch();
      toast.success("success");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteCommments = (refetch: any) => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USERDELETECOMMENTS"],
    mutationFn: async (id) => await deleteComment(id),
    onSuccess: () => {
      refetch();
      toast.success("success");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
