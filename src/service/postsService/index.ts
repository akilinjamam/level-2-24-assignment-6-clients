"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/libs/AxiosInstance";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

const cookieStore = cookies();
const accessToken = cookieStore.get("accessToken")?.value as string;

export const uploadPosts = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/posts/create-posts",
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: accessToken,
        },
      }
    );
    return data;
  } catch (error: any) {
    console.log(error);
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
