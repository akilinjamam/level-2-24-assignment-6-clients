"use server";
import { jwtDecoder } from "@/jwtDecoder/jwtDecoder";
/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/libs/AxiosInstance";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/auth/create-user",
      userData
    );
    return data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message || "Registration failed.";
      throw new Error(errorMessage);
    } else {
      throw new Error(
        error.message || "An unknown error occurred during registration."
      );
    }
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/api/auth/user-login", userData);

    if (data.success) {
      cookies().set("accessToken", data?.token);
    }
    return data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data?.message || "Login failed.";
      throw new Error(errorMessage);
    } else {
      throw new Error(
        error.message || "An unknown error occurred during login."
      );
    }
  }
};

export const userChangePassword = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/auth/change-password",
      userData
    );
    return data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data?.message || "failed.";
      throw new Error(errorMessage);
    } else {
      throw new Error(
        error.message || "An unknown error occurred during password change..."
      );
    }
  }
};

export const userSendRecoveryPassword = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/auth/send-recovery-password",
      userData
    );
    return data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data?.message || "failed.";
      throw new Error(errorMessage);
    } else {
      throw new Error(
        error.message || "An unknown error occurred during password change..."
      );
    }
  }
};

export const userSendRecoveryEmail = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/auth/password-recovery",
      userData
    );
    return data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data?.message || "failed.";
      throw new Error(errorMessage);
    } else {
      throw new Error(
        error.message || "An unknown error occurred during password change..."
      );
    }
  }
};

export const getCurrentUser = () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = jwtDecoder(accessToken);

    return {
      email: decodedToken.email,
      role: decodedToken?.role,
    };
  }

  return decodedToken;
};

export const logout = () => {
  cookies().delete("accessToken");
};
