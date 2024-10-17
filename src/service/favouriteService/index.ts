"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/libs/AxiosInstance";
import { FieldValues } from "react-hook-form";

export const getFavourites = async () => {
  try {
    const { data } = await axiosInstance.get("/api/favourite");
    return data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data?.message || "favourite failed.";
      throw new Error(errorMessage);
    } else {
      throw new Error(
        error.message || "An unknown error occurred during favourite."
      );
    }
  }
};

export const createFavourites = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/favourite/create-favourite",
      userData
    );
    return data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data?.message || "favourite failed.";
      throw new Error(errorMessage);
    } else {
      throw new Error(
        error.message || "An unknown error occurred during favourite post."
      );
    }
  }
};
