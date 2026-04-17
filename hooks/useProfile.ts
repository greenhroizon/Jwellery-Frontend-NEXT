import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
} from "@/service/profileService";

// 🔹 Get Profile
export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
};

// 🔹 Update Profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

// 🔹 Change Password
export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};

// 🔹 Delete Account
export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: deleteAccount,
  });
};