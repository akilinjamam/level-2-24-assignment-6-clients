/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/libs/AxiosInstance";
import { FieldValues } from "react-hook-form";

export const updateCoverPhoto = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/auth/update-cover-photo",
      userData
    );
    return data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message || "profile update failed.";
      throw new Error(errorMessage);
    } else {
      throw new Error(
        error.message || "An unknown error occurred during registration."
      );
    }
  }
};
