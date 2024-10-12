"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/libs/AxiosInstance";
import { FieldValues } from "react-hook-form";

export const createFollow = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/follow/create-follower",
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
export const removeFollow = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/follow/remove-follow",
      userData
    );
    return data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data?.message || "remove failed.";
      throw new Error(errorMessage);
    } else {
      throw new Error(
        error.message || "An unknown error occurred during registration."
      );
    }
  }
};
export const getFollow = async () => {
  try {
    const { data } = await axiosInstance.get("/api/follow/");
    return data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data?.message || "get follow failed.";
      throw new Error(errorMessage);
    } else {
      throw new Error(
        error.message || "An unknown error occurred during registration."
      );
    }
  }
};
