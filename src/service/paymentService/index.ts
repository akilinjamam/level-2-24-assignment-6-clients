/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/libs/AxiosInstance";
import { FieldValues } from "react-hook-form";

export const createPayment = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/payment/create-payment",
      userData
    );
    return data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data?.message || "payment failed.";
      throw new Error(errorMessage);
    } else {
      throw new Error(
        error.message || "An unknown error occurred during payment."
      );
    }
  }
};
