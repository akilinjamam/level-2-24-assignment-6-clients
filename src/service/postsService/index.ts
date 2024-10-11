/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/libs/AxiosInstance";
import { FieldValues } from "react-hook-form";

export const uploadPosts = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/posts/create-posts",
      userData
    );
    return data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data?.message || "post failed.";
      throw new Error(errorMessage);
    } else {
      throw new Error(
        error.message || "An unknown error occurred during registration."
      );
    }
  }
};
export const getPosts = async () => {
  try {
    const { data } = await axiosInstance.get("/api/posts");
    return data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data?.message || "post failed.";
      throw new Error(errorMessage);
    } else {
      throw new Error(
        error.message || "An unknown error occurred during registration."
      );
    }
  }
};
