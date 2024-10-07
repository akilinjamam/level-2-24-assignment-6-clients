/* eslint-disable @typescript-eslint/no-explicit-any */
import { updateCoverPhoto } from "@/service/profileService";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

export const useUpdateCover = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USERCOVERPHOTO"],
    mutationFn: async (userData) => await updateCoverPhoto(userData),
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
