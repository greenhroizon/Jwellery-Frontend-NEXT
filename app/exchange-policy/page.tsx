"use client";

import { useEffect, useState } from "react";

const API_URL =
  "http://localhost:5000/api/v1/user/get-all-content";

type ContentItem = {
  id: string;
  type: string;
  title: string;
  content: string;
};

export default function ShippingPolicyDocs() {
  const [data, setData] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();

        if (!json?.success) {
          throw new Error("Failed to fetch content");
        }

        // extract SHIPPING_POLICY
        const shipping = json.data.find(
          (item: ContentItem) => item.type === "EXCHANGE_POLICY"
        );

        setData(shipping || null);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No Shipping Policy Found
      </div>
    );
  }

 return (
  <div className="min-h-screen bg-[#f5f5f5] py-6 px-3">
        {/* Title */}
    <h1 className="text-center text-2xl font-bold tracking-wider mb-1">
      EXCHANGE POLICY
    </h1>
  <div className="max-w-2xl mx-auto bg-white p-4 shadow-sm">

    {/* Content */}
<div
  className="text-[16px] leading-snug text-gray-800
             
             [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mb-2
             [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-2
             [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-1
             
             [&_p]:mb-1
             [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:mb-1
             [&_li]:mb-[1px]"
  dangerouslySetInnerHTML={{ __html: data.content }}
/>
  </div>
</div>
);
}