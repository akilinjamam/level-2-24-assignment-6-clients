"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/libs/AxiosInstance";
import { FieldValues } from "react-hook-form";

export const getComments = async () => {
  try {
    const { data } = await axiosInstance.get("/api/comment");
    return data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data?.message || "comment failed.";
      throw new Error(errorMessage);
    } else {
      throw new Error(
        error.message || "An unknown error occurred during comment."
      );
    }
  }
};

export const createComment = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/comment/create-comment",
      userData
    );
    return data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data?.message || "comment failed.";
      throw new Error(errorMessage);
    } else {
      throw new Error(
        error.message || "An unknown error occurred during comment."
      );
    }
  }
};

export const updateComment = async (userData: FieldValues, id: string) => {
  try {
    const { data } = await axiosInstance.post(`/api/comment/${id}`, userData);
    return data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data?.message || "comment failed.";
      throw new Error(errorMessage);
    } else {
      throw new Error(
        error.message || "An unknown error occurred during downvote."
      );
    }
  }
};
export const deleteComment = async (id: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(`/api/comment/${id}`);
    return data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data?.message || "comment failed.";
      throw new Error(errorMessage);
    } else {
      throw new Error(
        error.message || "An unknown error occurred during comment."
      );
    }
  }
};
