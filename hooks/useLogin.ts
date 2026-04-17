"use client";

import { loginUser, registerUser, resendOtpApi, verifyOtpApi } from "@/service/authService";
import { RegisterPayload, RegisterResponse } from "@/type/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";


export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

export const useRegister = (onSuccessCallback?: () => void) => {
  return useMutation<RegisterResponse, any, RegisterPayload>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      const token = data?.data.token;

      if (token) {
        localStorage.setItem("otptoken", token);
      }

      toast.success(data?.message || "OTP sent successfully!");
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Signup failed. Please try again."
      );
    },
  });
};


export const useOtp = () => {
  const [loading, setLoading] = useState(false);
  const verifyOtp = async (otp: string, token: string) => {
    try {
      setLoading(true);

      const data = await verifyOtpApi(otp, token);

      toast.success(data?.message || "OTP verified successfully");

      return data;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "OTP verification failed"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const resendOtp = async (token: string) => {
    try {
      setLoading(true);

      const data = await resendOtpApi(token);

      toast.success(data?.message || "OTP resent successfully");

      return data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to resend OTP");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    verifyOtp,
    resendOtp,
    loading,
  };
};