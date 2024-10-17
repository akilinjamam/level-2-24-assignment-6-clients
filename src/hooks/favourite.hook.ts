/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFavourites, getFavourites } from "@/service/favouriteService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

export const useGetFavourite = () => {
  return useQuery({
    queryKey: ["GETFAVOURITE"],
    queryFn: async () => await getFavourites(),
  });
};

export const useCreateFavourite = (refetch: any) => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATEFAVOURITE"],
    mutationFn: async (data) => await createFavourites(data),
    onSuccess: (data) => {
      refetch();
      toast.success(data.message);
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error);
    },
  });
};
