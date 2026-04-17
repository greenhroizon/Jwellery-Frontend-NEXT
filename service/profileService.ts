import axios from "axios";
import { API } from "./dashboardService";


// 🔹 Get Profile
export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${API}/api/v1/user/get-profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// 🔹 Update Profile
export const updateProfile = async (payload: {
  firstName: string;
  lastName: string;
}) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("firstName", payload.firstName);
  formData.append("lastName", payload.lastName);

  const res = await axios.patch(
    `${API}/api/v1/user/upadate-profile`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// 🔹 Change Password
export const changePassword = async (payload: {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  const token = localStorage.getItem("token");

  const res = await axios.patch(
    `${API}/api/v1/user/change-password`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// 🔹 Delete Account
export const deleteAccount = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.delete(
    `${API}/api/v1/user/delete-account`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};