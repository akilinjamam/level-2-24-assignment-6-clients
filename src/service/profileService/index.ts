"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/libs/AxiosInstance";
import { FieldValues } from "react-hook-form";

export const updateCoverPhoto = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/auth/update-cover-photo",
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
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
export const updateProfilePhoto = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/auth/update-profile-photo",
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
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
export const getProfileUser = async () => {
  try {
    const { data } = await axiosInstance.get("/api/auth/get-user");
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
export const getOtherProfileUser = async (id: FieldValues) => {
  try {
    const { data } = await axiosInstance.get(`/api/auth/get-other-user/${id}`);
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
