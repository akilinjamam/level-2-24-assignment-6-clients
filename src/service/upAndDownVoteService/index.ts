"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/libs/AxiosInstance";
import { FieldValues } from "react-hook-form";

export const getUpvote = async () => {
  try {
    const { data } = await axiosInstance.get("/api/upvote");
    return data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data?.message || "upvote failed.";
      throw new Error(errorMessage);
    } else {
      throw new Error(
        error.message || "An unknown error occurred during upvote."
      );
    }
  }
};

export const getDownvote = async () => {
  try {
    const { data } = await axiosInstance.get("/api/downvote");
    return data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data?.message || "downvote failed.";
      throw new Error(errorMessage);
    } else {
      throw new Error(
        error.message || "An unknown error occurred during downvote."
      );
    }
  }
};

export const createUpvote = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/upvote/create-upvote",
      userData
    );
    return data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data?.message || "upvote failed.";
      throw new Error(errorMessage);
    } else {
      throw new Error(
        error.message || "An unknown error occurred during upvote."
      );
    }
  }
};

export const createDownvote = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/downvote/create-downvote",
      userData
    );
    return data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data?.message || "downvote failed.";
      throw new Error(errorMessage);
    } else {
      throw new Error(
        error.message || "An unknown error occurred during downvote."
      );
    }
  }
};
