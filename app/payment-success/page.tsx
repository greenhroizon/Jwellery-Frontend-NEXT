"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Home,
} from "lucide-react";

type StatusType = "success" | "failed" | "cancelled";

export default function PaymentStatusPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams.get("status") as StatusType | null;
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (!status) return;

    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      router.replace("/");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router, status]);

  if (!status) {
    router.replace("/");
    return null;
  }

  const config: Record<
    StatusType,
    {
      title: string;
      subtitle: string;
      icon: React.ReactNode;
      color: string;
      buttonText: string;
      action: () => void;
    }
  > = {
    success: {
      title: "Payment Successful 🎉",
      subtitle: "Thank you! Your payment was completed successfully.",
      icon: <CheckCircle className="w-16 h-16 text-green-500" />,
      color: "border-green-500",
      buttonText: "Go to Home",
      action: () => router.push("/"),
    },
    failed: {
      title: "Payment Failed ❌",
      subtitle: "Payment failed. Please try again.",
      icon: <XCircle className="w-16 h-16 text-red-500" />,
      color: "border-red-500",
      buttonText: "Try Again",
      action: () => router.push("/"),
    },
    cancelled: {
      title: "Payment Cancelled ⚠️",
      subtitle: "You cancelled the payment process.",
      icon: <AlertTriangle className="w-16 h-16 text-yellow-500" />,
      color: "border-yellow-500",
      buttonText: "Back to Home",
      action: () => router.push("/"),
    },
  };

  const fallback = {
    title: "Payment Status Unknown",
    subtitle: "Unable to determine payment status.",
    icon: <AlertTriangle className="w-16 h-16 text-gray-400" />,
    color: "border-gray-400",
    buttonText: "Go Home",
    action: () => router.push("/"),
  };

  const current = config[status] || fallback;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div
        className={`w-full max-w-md bg-white rounded-2xl shadow-lg border-t-4 ${current.color} p-8 text-center`}
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">{current.icon}</div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800">
          {current.title}
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 mt-2">{current.subtitle}</p>

        {/* Order ID */}
        {orderId && (
          <p className="mt-4 text-sm text-gray-600">
            <span className="font-semibold">Order ID:</span> {orderId}
          </p>
        )}

        {/* Button */}
        <button
          onClick={current.action}
          className="mt-6 inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition"
        >
          <Home className="w-4 h-4" />
          {current.buttonText}
        </button>
      </div>
    </div>
  );
}