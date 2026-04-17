"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/context/AuthContext";

import {
  useProfile,
  useUpdateProfile,
  useChangePassword,
  useDeleteAccount,
} from "@/hooks/useProfile";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ─────────────────────────────────────────────
  // 🔥 React Query Hooks
  // ─────────────────────────────────────────────
  const { data } = useProfile();
  const { mutate: updateProfileMutation } = useUpdateProfile();
  const { mutate: changePasswordMutation } = useChangePassword();
  const { mutate: deleteAccountMutation } = useDeleteAccount();

  // ─────────────────────────────────────────────
  // 🔥 Fill form from API
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (data?.data) {
      setFormData({
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        email: data.data.email,
        phone: data.data.phone,
      });
    }
  }, [data]);

  // ─────────────────────────────────────────────
  // 🔥 Input handlers
  // ─────────────────────────────────────────────
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e: any) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  // ─────────────────────────────────────────────
  // 🔥 UI
  // ─────────────────────────────────────────────
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 p-4 md:p-10 items-center md:items-start md:justify-center">

      {/* Sidebar */}
      <Card className="w-67 md:w-72 flex flex-col p-0">
        <div className="text-xl font-bold border-b px-4 py-3">
          Account Setting
        </div>

        <div
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-3 cursor-pointer ${
            activeTab === "profile"
              ? "bg-red-700 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          Your Profile
        </div>

        <div
          onClick={() => setActiveTab("reset")}
          className={`px-4 py-3 border-t cursor-pointer ${
            activeTab === "reset"
              ? "bg-red-700 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          Reset Password
        </div>

        <div
          onClick={() => setActiveTab("delete")}
          className={`px-4 py-3 border-t cursor-pointer ${
            activeTab === "delete"
              ? "bg-red-700 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          Delete
        </div>
      </Card>

      {/* Right Content */}
      <div className="flex-1">
        <Card className="md:p-15 p-10 bg-[#f5f5f5] rounded-2xl shadow-md">

          {/* ───────── PROFILE ───────── */}
          {activeTab === "profile" && (
            <>
              <h2 className="text-2xl font-bold mb-6">Profile</h2>

              <div className="flex justify-start mb-6">
                <img
                  src="/Images/graduate_4465457.png"
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  placeholder="First Name"
                />

                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  placeholder="Last Name"
                />

                <input
                  name="email"
                  value={formData.email}
                  readOnly
                  className="border p-2 rounded bg-gray-100 cursor-not-allowed"
                />

                <input
                  name="phone"
                  value={formData.phone}
                  readOnly
                  className="border p-2 rounded"
                />
              </div>

              <button
                onClick={() =>
                  updateProfileMutation(
                    {
                      firstName: formData.firstName,
                      lastName: formData.lastName,
                    },
                    {
                      onSuccess: () =>
                        toast.success("Profile updated successfully ✅"),
                      onError: () =>
                        toast.error("Failed to update profile ❌"),
                    }
                  )
                }
                className="mt-6 bg-red-700 text-white px-6 py-2 rounded-lg"
              >
                Update
              </button>
            </>
          )}

          {/* ───────── RESET PASSWORD ───────── */}
          {activeTab === "reset" && (
            <>
              <h2 className="text-2xl font-bold mb-6">Change Password</h2>

              <div className="grid grid-cols-2 gap-6">
                <input
                  type="password"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  className="border p-2 rounded"
                  placeholder="Old Password"
                />

                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="border p-2 rounded"
                  placeholder="New Password"
                />

                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="border p-2 rounded"
                  placeholder="Confirm Password"
                />
              </div>

              <button
                onClick={() =>
                  changePasswordMutation(
                    {
                      oldPassword: passwordData.oldPassword,
                      newPassword: passwordData.newPassword,
                      confirmPassword: passwordData.confirmPassword,
                    },
                    {
                      onSuccess: () => {
                        toast.success("Password updated successfully ✅");
                        setPasswordData({
                          oldPassword: "",
                          newPassword: "",
                          confirmPassword: "",
                        });
                      },
                      onError: () =>
                        toast.error("Password update failed ❌"),
                    }
                  )
                }
                className="mt-6 bg-red-700 text-white px-6 py-2 rounded-lg"
              >
                Update Password
              </button>
            </>
          )}

          {/* ───────── DELETE ACCOUNT ───────── */}
          {activeTab === "delete" && (
            <>
              <h2 className="text-2xl font-bold mb-6">Delete Account</h2>

              <div className="bg-white p-6 rounded-xl shadow text-center">
                <p className="mb-4">
                  Are you sure you want to delete your account?
                </p>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() =>
                      deleteAccountMutation(undefined, {
                        onSuccess: () => {
                          toast.success("Account deleted 🗑️");

                          localStorage.removeItem("token");
                          localStorage.removeItem("cart");
                          localStorage.removeItem("user");
                          setIsLoggedIn(false);

                          setTimeout(() => {
                            router.push("/signin");
                          }, 1200);
                        },
                        onError: () =>
                          toast.error("Delete failed ❌"),
                      })
                    }
                    className="bg-black text-white px-6 py-2 rounded-lg"
                  >
                    Yes
                  </button>

                  <button
                    onClick={() => setActiveTab("profile")}
                    className="bg-red-700 text-white px-6 py-2 rounded-lg"
                  >
                    No
                  </button>
                </div>
              </div>
            </>
          )}

        </Card>
      </div>
    </div>
  );
}