import { createPayment } from "@/service/paymentService";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

export const useCreatePayment = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATEPAYMENT"],
    mutationFn: async (data) => await createPayment(data),
    onSuccess: (data) => {
      toast.success("success");
      window.location.href = data?.data?.url;
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
