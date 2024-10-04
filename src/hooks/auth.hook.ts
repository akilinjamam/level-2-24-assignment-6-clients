/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  loginUser,
  registerUser,
  userChangePassword,
} from "@/service/authService";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User registration successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success("User logged in successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserChangePassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_CHANGE_PASSWORD"],
    mutationFn: async (userData) => await userChangePassword(userData),
    onSuccess: () => {
      toast.success("Password changed successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
