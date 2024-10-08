/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  loginUser,
  registerUser,
  userChangePassword,
  userSendRecoveryEmail,
  userSendRecoveryPassword,
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
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
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
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserRecoveryPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_CHANGE_PASSWORD"],
    mutationFn: async (userData) => await userSendRecoveryPassword(userData),
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserSendRecoveryEmail = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER__PASSWORD"],
    mutationFn: async (data) => await userSendRecoveryEmail(data),
    onSuccess: () => {
      toast.success("an Email has been sent to you. please check");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
